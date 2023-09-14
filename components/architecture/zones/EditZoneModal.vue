<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier la zone {{ zone.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <form ref="form">
          <v-app>
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
              label="choix du niveau"
              :error="errors.niveau_id.exist"
              :error-messages="errors.niveau_id.message"
            >
              <template #label>
                Choix du niveau
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
          </v-app>
          <div class="form-group">
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
        </form>
      </b-overlay>
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
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    niveaux: [],
    loading: false,
    search: null,
    zone: {
      id: null,
      nom: '',
      niveau_id: '',
    },
    errors: {
      nom: { exist: false, message: null },
      niveau_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { zone } = await this.getOne(this.id)
    const { niveau } = await this.getNiveau(zone.niveau_id)
    this.niveaux.push({
      texte: niveau.nom + ' ' + niveau.pavillon.nom + ' ' + niveau.site.nom,
      id: niveau.id,
    })
    this.zone = zone
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
  watch: {
    search(oldVal, newVal) {
      newVal && newVal !== this.zone.niveau_id && this.querySelections(newVal)
    },
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/zone/modifier',
      getSearch: 'architecture/niveau/getSearch',
      getNiveau: 'architecture/niveau/getOne',
      getOne: 'architecture/zone/getOne',
    }),
    save() {
      this.submiting = true
      this.modifier(this.zone)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.dialog = false
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
