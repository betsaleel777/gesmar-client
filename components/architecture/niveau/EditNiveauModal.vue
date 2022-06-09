<template>
  <b-modal id="modalEditNiveau" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">
        Modifier le niveau {{ niveau.nom }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-autocomplete
            v-model="niveau.pavillon_id"
            :items="pavillons"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.pavillon_id.exist"
            :error-messages="errors.pavillon_id.message"
          >
            <template #label>
              Choix du pavillon
              <span class="red--text"><strong>* </strong></span>
            </template>
            <template #item="data">
              {{ data.item.site.nom }} {{ data.item.nom }}
            </template>
          </v-autocomplete>
        </v-app>
        <div class="form-group required">
          <label class="form-label"
            >Nom<span class="text-danger">*</span></label
          >
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
    pavillons: {
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
    this.niveau.id = this.current.id
    this.niveau.pavillon_id = this.current.pavillon_id
    this.niveau.nom = this.current.nom
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/niveau/modifier',
    }),
    save() {
      this.modifier(this.niveau)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.$bvModal.hide('modalEditNiveau')
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
      this.niveau = {
        id: null,
        nom: '',
        pavillon_id: '',
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
