<template>
  <b-modal id="modalEditPavillon" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le pavillon {{ pavillon.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
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
import { SUPERROLE } from '~/helper/constantes'
export default {
  props: {
    marches: {
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
  computed: {
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
  mounted() {
    this.pavillon.id = this.current.id
    this.pavillon.site_id = this.current.site_id
    this.pavillon.nom = this.current.nom
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/pavillon/modifier',
    }),
    save() {
      this.submiting = true
      this.modifier(this.pavillon)
        .then(({ message }) => {
          this.$bvModal.hide('modalEditPavillon')
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
      this.pavillon = {
        id: null,
        nom: '',
        site_id: '',
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style scoped></style>
