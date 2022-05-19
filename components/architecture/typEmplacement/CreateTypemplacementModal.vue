<template>
  <b-modal id="modalCreateTypempl" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Nouveau type d'emplacement
      </h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom complet</label>
          <input
            v-model="type.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="reset"
      >
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  data: () => ({
    type: {
      nom: '',
    },
    errors: {
      nom: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/typEmplacement', ['ajouter']),
    save() {
      this.ajouter(this.type)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreatetype')
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
    },
    reset() {
      this.type = {
        nom: '',
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreatetype')
    },
  },
}
</script>
<style></style>
