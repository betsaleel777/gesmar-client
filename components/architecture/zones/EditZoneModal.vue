<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier la zone {{ zone.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
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
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true,
    },
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
    const { zone } = await this.getZone(this.id)
    this.niveaux.push({
      texte: zone.niveau.nom + ' ' + zone.pavillon.nom + ' ' + zone.site.nom,
      id: zone.niveau.id,
    })
    this.zone = zone
  },
  watch: {
    search(oldVal, newVal) {
      newVal && newVal !== this.zone.niveau_id && this.querySelections(newVal)
    },
  },
  methods: {
    ...mapActions({
      modifier: MODULES.ZONE.ACTIONS.EDIT,
      getSearch: MODULES.NIVEAU.ACTIONS.SEARCH,
      getZone: MODULES.ZONE.ACTIONS.ONE,
    }),
    save() {
      this.submiting = true
      this.modifier(this.zone)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
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
