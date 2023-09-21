<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le pavillon {{ pavillon.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <form ref="form">
          <v-app>
            <v-autocomplete
              v-model="pavillon.site_id"
              :items="sites"
              item-text="nom"
              item-value="id"
              outlined
              dense
              label="choix du marché"
              :error="errors.site_id.exist"
              :error-messages="errors.site_id.message"
            >
              <template #label>
                Choix du marché
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
          </v-app>
          <div class="form-group required">
            <label class="form-label">Nom<span class="text-danger">*</span></label>
            <input
              v-model="pavillon.nom"
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
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import { SUPERROLE } from '~/helper/constantes'
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
    pavillon: {
      id: null,
      nom: '',
      site_id: '',
    },
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    await this.getMarches()
    const { pavillon } = await this.getOne(this.id)
    this.pavillon = pavillon
  },
  computed: {
    ...mapGetters({ marches: 'architecture/marche/marches' }),
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    sites() {
      return this.user.role.name === SUPERROLE ? this.marches : this.user.sites
    },
  },
  methods: {
    ...mapActions({
      getMarches: 'architecture/marche/getAll',
      getOne: 'architecture/pavillon/getOne',
      modifier: 'architecture/pavillon/modifier',
    }),
    save() {
      this.submiting = true
      this.modifier(this.pavillon)
        .then(({ message }) => {
          this.dialog = false
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
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
    close() {
      this.pavillon = {}
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style scoped></style>
