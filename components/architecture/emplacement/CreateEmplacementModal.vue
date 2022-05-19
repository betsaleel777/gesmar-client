<template>
  <b-modal id="modalCreateEmplacement" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouvel Emplacement</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-autocomplete
            v-model="emplacement.zone_id"
            :items="zones"
            item-text="nom"
            item-value="id"
            outlined
            dense
            label="choix de la zone"
            :error="errors.zone_id.exist"
            :error-messages="errors.zone_id.message"
          ></v-autocomplete>
        </v-app>
        <div class="form-group required">
          <label class="form-label">Nom complet</label>
          <input
            v-model="emplacement.nom"
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
          <label class="form-label">Superficie</label>
          <input
            v-model="emplacement.superficie"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.superficie.exist }"
            placeholder="Entrer la superficie"
          />
          <span
            v-if="errors.superficie.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.superficie.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <label class="form-label">Loyer</label>
          <input
            v-model="emplacement.loyer"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.loyer.exist }"
            placeholder="Entrer le loyer"
          />
          <span v-if="errors.loyer.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.loyer.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <label class="form-label">Pas de porte</label>
          <input
            v-model="emplacement.pas_porte"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.pas_porte.exist }"
            placeholder="Entrer le pas de porte"
          />
          <span
            v-if="errors.pas_porte.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.pas_porte.message }}</strong>
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
  props: {
    types: {
      type: Array,
      required: true,
    },
    zones: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    emplacement: {
      nom: '',
      superficie: '',
      loyer: '',
      pas_porte: '',
      zone_id: null,
      type_emplacement_id: null,
    },
    errors: {
      nom: { exist: false, message: null },
      superficie: { exist: false, message: null },
      loyer: { exist: false, message: null },
      zone_id: { exist: false, message: null },
      type_emplacement_id: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/emplacement', ['ajouter']),
    save() {
      this.ajouter(this.emplacement)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateEmplacement')
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
      this.emplacement = {
        nom: '',
        superficie: '',
        loyer: '',
        pas_porte: '',
        zone_id: null,
        type_emplacement_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateEmplacement')
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
