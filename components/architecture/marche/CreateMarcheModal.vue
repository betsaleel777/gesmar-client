<template>
  <b-modal id="modalCreateMarche" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveau marché</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group required">
          <label class="form-label mg-t-10"
            >Nom complet<span class="text-danger">*</span></label
          >
          <input
            v-model="marche.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <label class="form-label"
            >Commune<span class="text-danger">*</span></label
          >
          <input
            v-model="marche.commune"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.commune.exist }"
            placeholder="Entrer la commune"
          />
          <span
            v-if="errors.commune.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.commune.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <label class="form-label"
            >Ville<span class="text-danger">*</span></label
          >
          <input
            v-model="marche.ville"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.ville.exist }"
            placeholder="Entrer la ville"
          />
          <span v-if="errors.ville.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.ville.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <label class="form-label"
            >Pays<span class="text-danger">*</span></label
          >
          <input
            v-model="marche.pays"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.pays.exist }"
            placeholder="Entrer le pays"
          />
          <span v-if="errors.pays.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.pays.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <label class="form-label">Adresse Postale</label>
          <input
            v-model="marche.postale"
            type="text"
            class="form-control"
            placeholder="Adresse postale"
          />
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
    marche: {
      nom: '',
      commune: '',
      ville: '',
      pays: '',
      postale: '',
    },
    errors: {
      nom: { exist: false, message: null },
      commune: { exist: false, message: null },
      ville: { exist: false, message: null },
      pays: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/marche', ['ajouter']),
    save() {
      this.ajouter(this.marche)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateMarche')
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
      this.marche = {
        nom: '',
        commune: '',
        ville: '',
        pays: '',
        postale: '',
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateMarche')
    },
  },
}
</script>
<style></style>
