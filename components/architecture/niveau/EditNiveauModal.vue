<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le niveau {{ niveau.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <form ref="form">
          <v-app>
            <v-autocomplete
              v-model="niveau.pavillon_id"
              :items="pavillons"
              :loading="loading"
              :search-input.sync="search"
              item-text="texte"
              item-value="id"
              cache-items
              outlined
              dense
              :error="errors.pavillon_id.exist"
              :error-messages="errors.pavillon_id.message"
            >
              <template #label>
                Choix du pavillon
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
          </v-app>
          <div class="form-group required">
            <label class="form-label">Nom<span class="text-danger">*</span></label>
            <input
              v-model="niveau.nom"
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
import { MODULES } from '~/helper/modules-types'
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
    pavillons: [],
    loading: false,
    search: null,
    niveau: {
      id: null,
      nom: '',
      pavillon_id: '',
    },
    errors: {
      nom: { exist: false, message: null },
      pavillon_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { niveau } = await this.getOne(this.id)
    this.pavillons.push({ texte: niveau.pavillon.nom + ' ' + niveau.site.nom, id: niveau.pavillon.id })
    this.niveau = niveau
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
      newVal && newVal !== this.niveau.pavillon_id && this.querySelections(newVal)
    },
  },
  methods: {
    ...mapActions({
      modifier: MODULES.NIVEAU.ACTIONS.EDIT,
      getSearch: MODULES.PAVILLON.ACTIONS.SEARCH,
      getOne: MODULES.NIVEAU.ACTIONS.ONE,
    }),
    save() {
      this.submiting = true
      this.modifier(this.niveau)
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
      this.niveau = {}
      errorsInitialise(this.errors)
      this.dialog = false
    },
    querySelections(search) {
      this.loading = true
      this.getSearch(search)
        .then((pavillons) => (this.pavillons = pavillons))
        .finally(() => (this.loading = false))
    },
  },
}
</script>
<style scoped></style>
