<template>
  <v-app>
    <b-modal v-model="dialog" scrollable>
      <template #modal-header>
        <h5 id="archiver" class="modal-title text-primary">Nouveau Pavillon</h5>
        <button type="button" class="close" aria-label="Close" @click="close">
          <span aria-hidden="true"><feather type="x" /></span>
        </button>
      </template>
      <template #default>
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
          <form ref="form">
            <v-app>
              <v-switch
                v-model="pavillon.automatiq"
                :label="pavillon.automatiq ? 'automatique' : 'manuel'"
              ></v-switch>
              <v-autocomplete
                v-model="pavillon.site_id"
                :items="sites"
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
            <div v-if="!pavillon.automatiq" class="form-group">
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
            <div v-else class="form-group">
              <label>Nombre de pavillons<span class="text-danger">*</span></label>
              <input
                v-model="pavillon.nombre"
                class="form-control"
                :class="{ 'is-invalid': errors.nombre.exist }"
              />
              <span v-if="errors.nombre" class="invalid-feedback" role="alert">
                <strong>{{ errors.nombre.message }}</strong>
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
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import { SUPERROLE } from '~/helper/constantes'
export default {
  props: { value: Boolean },
  data: () => ({
    submiting: false,
    pavillon: {
      nom: '',
      site_id: '',
      nombre: null,
      automatiq: false,
    },
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
      nombre: { exist: false, message: null },
    },
  }),
  async fetch() {
    await this.getMarches()
  },
  computed: {
    ...mapGetters({ marches: 'architecture/marche/marches' }),
    sites() {
      return this.user.role.name === SUPERROLE ? this.marches : this.user.sites
    },
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    ...mapActions({
      getMarches: 'architecture/marche/getAll',
      ajouter: 'architecture/pavillon/ajouter',
    }),
    save() {
      this.submiting = true
      this.ajouter(this.pavillon)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreatePavillon')
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
    close() {
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style scoped></style>
