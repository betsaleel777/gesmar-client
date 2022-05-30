<template>
  <b-modal id="modalEditEmplacement" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">
        Modifier l'emplacement {{ emplacement.nom }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
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
          <v-autocomplete
            v-model="emplacement.type_emplacement_id"
            :items="types"
            item-text="nom"
            item-value="id"
            outlined
            dense
            label="type d'emplacement"
            :error="errors.type_emplacement_id.exist"
            :error-messages="errors.type_emplacement_id.message"
          ></v-autocomplete>
        </v-app>
      </form>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="close"
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
    current: {
      type: Object,
      required: true,
    },
    value: Boolean,
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
    this.emplacement.id = this.current.id
    this.emplacement.nom = this.current.nom
    this.emplacement.superficie = this.current.superficie
    this.emplacement.loyer = this.current.loyer
    this.emplacement.pas_porte = this.current.pas_porte
    this.emplacement.zone_id = this.current.zone_id
    this.emplacement.type_emplacement_id = this.current.type_emplacement_id
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/emplacement/modifier',
    }),
    save() {
      this.modifier(this.marche)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.$bvModal.hide('modalEditEmplacement')
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
      this.emplacement = {
        nom: '',
        superficie: '',
        loyer: '',
        pas_porte: '',
        zone_id: null,
        type_emplacement_id: null,
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
