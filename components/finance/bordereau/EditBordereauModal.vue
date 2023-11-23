<template>
  <b-modal v-model="dialog" hide-footer size="lg" scrollable>
    <template #modal-header>
      <h5 v-if="bordereau.code" id="archiver" class="modal-title text-primary">
        modifier le bordereau {{ bordereau.code }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
          <h5 v-if="bordereauExist" class="text-center">
            Bordereau du commercial {{ bordereau.commercial.user.name }}
          </h5>
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <ValidationProvider v-slot="{ errors }" name="emplacements">
              <v-alert v-if="errors.length > 0" type="error" outlined>{{ errors }}</v-alert>
              <TableauEditBordereau
                :preselected="bordereau.emplacements"
                :site="bordereau.site_id"
                @selected="onSelected"
              />
            </ValidationProvider>
            <v-btn color="primary" :loading="submiting" block @click="handleSubmit(save)"
              >confirmer les modifications</v-btn
            >
          </ValidationObserver>
        </b-overlay>
      </v-app>
    </template>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'
import TableauEditBordereau from './TableauEditBordereau.vue'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { TableauEditBordereau, ValidationObserver, ValidationProvider },
  props: { id: { type: Number, required: true }, value: Boolean },
  data() {
    return {
      assignation: {
        bordereau_id: this.id,
        emplacements: [],
      },
      submiting: false,
      zones: [],
    }
  },
  async fetch() {
    await this.getOne(this.id)
    this.assignation.emplacements = this.bordereau.emplacements.map(({ id }) => id)
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    ...mapGetters({ bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU }),
    bordereauExist() {
      return Object.keys(this.bordereau).length > 0
    },
  },
  methods: {
    ...mapActions({
      getOne: MODULES.BORDEREAU.ACTIONS.ONE_EDIT,
      modifier: MODULES.BORDEREAU.ACTIONS.EDIT,
    }),
    save() {
      this.submiting = true
      this.modifier(this.assignation)
        .then((message) => {
          this.$bvToast.toast(message, { title: "SUCCES DE L'OPERATION", variant: 'success', solid: true })
          this.dialog = false
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            this.$refs.form.setErrors(data.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
    onSelected(selected) {
      this.assignation.emplacements = selected.map(({ id }) => id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
