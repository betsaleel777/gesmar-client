<template>
  <b-modal id="modalEditTypempl" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le type d'emplacement {{ type.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-switch
            v-model="type.auto_valid"
            :label="
              type.auto_valid
                ? 'validation directe du contrat sans paiement'
                : 'paiement requis pour la validation du contrat'
            "
          ></v-switch>
          <v-spacer></v-spacer>
          <v-switch
            v-model="type.equipable"
            :label="type.equipable ? 'avec équipement' : 'sans équipement'"
          ></v-switch>
        </v-app>
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom complet<span class="text-danger">*</span></label>
          <input
            v-model="type.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group required">
          <label class="form-label mg-t-10"
            >Code<span class="text-danger">*</span> Ex:(MAG pour magasin)</label
          >
          <input
            v-model="type.prefix"
            type="text"
            :class="{ 'is-invalid': errors.prefix.exist }"
            class="form-control"
          />
          <span v-if="errors.prefix.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.prefix.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="type.site_id"
            :items="marches"
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
  props: {
    current: {
      type: Object,
      required: true,
    },
    marches: {
      type: Array,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    type: {
      id: null,
      nom: '',
      prefix: '',
      site_id: null,
      auto_valid: false,
      equipable: false,
    },
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
      prefix: { exist: false, message: null },
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
    this.type.id = this.current.id
    this.type.nom = this.current.nom
    this.type.prefix = this.current.prefix
    this.type.site_id = this.current.site_id
    this.type.auto_valid = this.current.auto_valid
    this.type.equipable = this.current.equipable
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/typEmplacement/modifier',
    }),
    save() {
      this.submiting = true
      this.modifier(this.type)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.$bvModal.hide('modalEditTypempl')
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
      this.type = {
        id: null,
        nom: '',
        prefix: '',
        site_id: null,
        auto_valid: false,
        equipable: false,
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style scoped></style>
