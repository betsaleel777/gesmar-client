<template>
  <b-modal v-model="dialog" hide-footer size="lg" scrollable>
    <template #modal-header>
      <h5 v-if="bordereau.code" id="archiver" class="modal-title text-primary">modifier le bordereau {{ bordereau.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
          <h5 v-if="bordereauExist" class="text-center">Bordereau du commercial {{ bordereau.commercial.user.name }}</h5>
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <ValidationProvider v-slot="{ errors }" name="emplacements">
              <v-alert v-if="errors.length > 0" type="error" outlined>{{ errors }}</v-alert>
              <TableauEditBordereau v-if="bordereauExist" :key="bordereau.toString()" @selected="onSelected" />
            </ValidationProvider>
            <v-btn color="primary" :loading="submiting" block @click="handleSubmit(save)">confirmer les modifications</v-btn>
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
import modal from '~/mixins/modal'
export default {
  components: { TableauEditBordereau, ValidationObserver, ValidationProvider },
  mixins: [modal],
  props: { id: { type: Number, required: true } },
  data() {
    return {
      assignation: {
        bordereau_id: this.id,
        emplacements: [],
      },
      submiting: false,
    }
  },
  async fetch() {
    await this.getOne(this.id)
    this.assignation.emplacements = this.bordereau.emplacements.map(({ id, loyer }) => {
      return { id, loyer }
    })
  },
  computed: {
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
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
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
      this.assignation.emplacements = selected.map(({ id, loyer }) => {
        return { id, loyer }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
