<template>
  <b-modal id="modalEditAnnexe" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le service {{ annexe.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group">
          <label class="form-label">Nom</label>
          <input
            v-model="annexe.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrez le nom du service"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-radio-group
            v-model="annexe.mode"
            row
            dense
            :error="errors.mode.exist"
            :error-messages="errors.mode.message"
            @change="suffixeSet"
          >
            <v-radio label="Par mois" :value="MODE.mensuel"></v-radio>
            <v-spacer></v-spacer>
            <v-radio label="Par jour" :value="MODE.quotidien"></v-radio>
            <v-spacer></v-spacer>
            <v-radio label="Forfaitaire" :value="MODE.forfait"></v-radio>
          </v-radio-group>
        </v-app>
        <b-form-group label-for="prix">
          <template #label>
            <span class="form-label">Prix <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="prix"
              v-model="annexe.prix"
              type="text"
              :class="{ 'is-invalid': errors.prix.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold">
                FCFA {{ suffix }}
              </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.prix.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.prix.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea v-model="annexe.description" class="form-control" cols="30" rows="5"></textarea>
        </div>
        <v-app>
          <v-autocomplete
            v-model="annexe.site_id"
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
import { ANNEXE } from '~/helper/constantes'
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
    submiting: false,
    suffix: '',
    MODE: ANNEXE,
    annexe: {
      nom: '',
      prix: '',
      description: '',
      site_id: null,
      mode: '',
    },
    errors: {
      nom: { exist: false, message: null },
      prix: { exist: false, message: null },
      site_id: { exist: false, message: null },
      mode: { exist: false, message: null },
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
    this.annexe.id = this.current.id
    this.annexe.nom = this.current.nom
    this.annexe.prix = this.current.prix
    this.annexe.site_id = this.current.site_id
    this.annexe.mode = String(this.current.mode)
    this.annexe.description = this.current.description
    this.suffixeSet()
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/annexe/modifier',
    }),
    save() {
      this.submiting = true
      this.modifier(this.annexe)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.$bvModal.hide('modalEditAnnexe')
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
      this.annexe = {
        id: null,
        nom: '',
        prix: '',
        description: '',
        site_id: null,
        mode: '',
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
    suffixeSet() {
      if (this.annexe.mode === ANNEXE.quotidien) {
        this.suffix = '/ jour'
      } else if (this.annexe.mode === ANNEXE.mensuel) {
        this.suffix = '/ mois'
      } else {
        this.suffix = ''
      }
    },
  },
}
</script>
<style scoped></style>
