<template>
  <b-modal id="modalCreateTypequip" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveau type d'équipement</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group">
          <label class="form-label mg-t-10">Nom complet<span class="text-danger">*</span></label>
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
        <b-form-group label-for="frais_penalite">
          <template #label>
            <span class="form-label">Frais de Pénalite <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="frais_penalite"
              v-model="type.frais_penalite"
              type="text"
              :class="{ 'is-invalid': errors.frais_penalite.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.frais_penalite.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.frais_penalite.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="caution_abonnement">
          <template #label>
            <span class="form-label">Caution d'Abonnement <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="caution_abonnement"
              v-model="type.caution_abonnement"
              type="text"
              :class="{ 'is-invalid': errors.caution_abonnement.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.caution_abonnement.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.caution_abonnement.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <v-app>
          <v-autocomplete
            v-model="type.site_id"
            :items="marches"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.site_id.exist"
            :error-messages="errors.site_id.message"
          >
            <template #label>
              Choix du marché
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
        </v-app>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
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
  emits: ['pushed'],
  data: () => ({
    submiting: false,
    type: {
      nom: '',
      frais_penalite: '',
      site_id: '',
      caution_abonnement: null,
    },
    errors: {
      nom: { exist: false, message: null },
      frais_penalite: { exist: false, message: null },
      site_id: { exist: false, message: null },
      caution_abonnement: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/typEquipement', ['ajouter']),
    save() {
      this.submiting = true
      this.ajouter(this.type)
        .then(({ message, id }) => {
          this.$emit('pushed', id)
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
        .finally(() => (this.submiting = false))
    },
    reset() {
      this.type = {
        nom: '',
        frais_penalite: '',
        site_id: '',
        caution_abonnement: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateTypequip')
    },
  },
}
</script>
<style></style>
<style scoped></style>
