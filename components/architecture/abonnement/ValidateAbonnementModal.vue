<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Confirmation d'abonnement: <strong>{{ validation.code }}</strong>
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <v-app>
          <v-switch
            v-model="validation.verdict"
            :label="validation.verdict ? 'validé' : 'rejetté'"
          ></v-switch>
          <v-textarea
            v-model="validation.raison"
            counter
            outlined
            :error="errors.raison.exist"
            :error-messages="errors.raison.message"
          >
            <template #label>
              Les raisons
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-textarea>
        </v-app>
      </b-overlay>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { MODULES } from '~/helper/modules-types'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    validation: {
      abonnement_id: null,
      raison: null,
      code: null,
      verdict: true,
    },
    errors: {
      raison: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { validation } = await this.getOne(this.id)
    this.validation = validation
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
  },
  methods: {
    ...mapActions({
      ajouter: MODULES.ABONNEMENT.VALIDATION.ACTIONS.ADD,
      getOne: MODULES.ABONNEMENT.VALIDATION.ACTIONS.ONE,
    }),
    save() {
      this.submiting = true
      this.ajouter(this.validation)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: "Succès de l'opération".toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.close()
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style scoped></style>
