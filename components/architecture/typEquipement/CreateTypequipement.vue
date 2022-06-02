<template>
  <b-modal id="modalCreateTypequip" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Nouveau type d'équipement
      </h5>
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
        <label class="form-label mg-t-3"
          >Frais de pénalité<span class="text-danger">*</span></label
        >
        <b-input-group>
          <b-form-input
            v-model="type.frais_penalite"
            type="text"
            :class="{ 'is-invalid': errors.frais_penalite.exist }"
            class="form-control"
          />
          <b-input-group-append>
            <b-input-group-text class="bg-transparent font-weight-bold">
              FCFA
            </b-input-group-text>
          </b-input-group-append>
          <span
            v-if="errors.frais_penalite.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.frais_penalite.message }}</strong>
          </span>
        </b-input-group>
        <div class="form-group mg-t-15">
          <v-app>
            <v-autocomplete
              v-model="type.site_id"
              :items="marches"
              item-text="nom"
              item-value="id"
              outlined
              dense
              label="choix du site"
              :error="errors.site_id.exist"
              :error-messages="errors.site_id.message"
            ></v-autocomplete>
          </v-app>
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
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    type: {
      nom: '',
      frais_penalite: '',
      site_id: '',
    },
    errors: {
      nom: { exist: false, message: null },
      frais_penalite: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/typEquipement', ['ajouter']),
    save() {
      this.ajouter(this.type)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateTypequip')
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
        frais_penalite: '',
        site_id: '',
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateTypequip')
    },
  },
}
</script>
<style></style>
