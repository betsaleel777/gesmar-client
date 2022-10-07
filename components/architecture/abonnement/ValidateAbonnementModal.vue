<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Confirmation d'abonnement: <strong>{{ validation.code }}</strong>
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
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
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="close">fermer</button>
      <button type="button" class="btn btn-primary" @click="save">valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    infos: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
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
  mounted() {
    this.validation.code = this.infos.code
    this.validation.abonnement_id = this.infos.abonnement_id
  },
  methods: {
    ...mapActions('architecture/validationAbonnement', ['ajouter']),
    save() {
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
    },
    close() {
      this.validation = {
        abonnement_id: null,
        raison: null,
        code: null,
        verdict: true,
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style scoped></style>
