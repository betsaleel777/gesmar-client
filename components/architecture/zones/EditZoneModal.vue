<template>
  <b-modal id="modalEditZone" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier la zone {{ zone.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group">
          <v-app>
            <v-autocomplete
              v-model="zone.niveau_id"
              :items="niveaux"
              item-text="nom"
              item-value="id"
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
              <template #item="data">
                {{ data.item.pavillon.site.nom }}
                {{ data.item.pavillon.nom }}
                {{ data.item.nom }}
              </template>
            </v-autocomplete>
          </v-app>
        </div>
        <div class="form-group required">
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
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="close">Fermer</button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    niveaux: {
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
    this.zone.id = this.current.id
    this.zone.niveau_id = this.current.niveau_id
    this.zone.nom = this.current.nom
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/zone/modifier',
    }),
    save() {
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
    },
    close() {
      this.zone = {
        id: null,
        nom: '',
        niveau_id: '',
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style scoped></style>
