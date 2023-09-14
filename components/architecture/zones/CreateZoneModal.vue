<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouvelle Zone</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-switch v-model="zone.automatiq" :label="zone.automatiq ? 'automatique' : 'manuel'"></v-switch>
          <v-autocomplete
            v-model="zone.niveau_id"
            :items="niveaux"
            :loading="loading"
            :search-input.sync="search"
            item-text="texte"
            item-value="id"
            cache-items
            outlined
            dense
            :error="errors.niveau_id.exist"
            :error-messages="errors.niveau_id.message"
          >
            <template #label>
              Choix du niveau
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
        </v-app>
        <div v-if="!zone.automatiq" class="form-group">
          <label class="form-label">Nom<span class="text-danger">*</span></label>
          <input
            v-model="zone.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div v-else class="form-group">
          <label>Nombre de zones<span class="text-danger">*</span></label>
          <input v-model="zone.nombre" class="form-control" :class="{ 'is-invalid': errors.nombre.exist }" />
          <span v-if="errors.nombre" class="invalid-feedback" role="alert">
            <strong>{{ errors.nombre.message }}</strong>
          </span>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="close">Fermer</button>
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
  props: { value: Boolean },
  data: () => ({
    submiting: false,
    niveaux: [],
    loading: false,
    search: null,
    zone: {
      nom: '',
      niveau_id: '',
      nombre: null,
      automatiq: false,
    },
    errors: {
      nom: { exist: false, message: null },
      niveau_id: { exist: false, message: null },
      nombre: { exist: false, message: null },
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
  watch: {
    search(val) {
      val && val !== this.zone.niveau_id && this.querySelections(val)
    },
  },
  methods: {
    ...mapActions({
      ajouter: 'architecture/zone/ajouter',
      getSearch: 'architecture/niveau/getSearch',
    }),
    save() {
      this.submiting = true
      this.ajouter(this.zone)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.$bvModal.hide('modalCreateZone')
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
    close() {
      this.zone = {}
      errorsInitialise(this.errors)
      this.dialog = false
    },
    querySelections(search) {
      this.loading = true
      this.getSearch(search)
        .then((niveaux) => (this.niveaux = niveaux))
        .finally(() => (this.loading = false))
    },
  },
}
</script>
<style scoped></style>
