<template>
  <b-modal id="modalEditEmplacement" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">
        Modifier l'emplacement {{ emplacement.nom }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="row">
          <div class="col-md-6 col-sm-6">
            <div class="form-group">
              <label class="form-label"
                >Nom complet <span class="text-danger">*</span></label
              >
              <input
                v-model="emplacement.nom"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.nom.exist }"
                placeholder="Entrer votre nom complet"
              />
              <span
                v-if="errors.nom.exist"
                class="invalid-feedback"
                role="alert"
              >
                <strong>{{ errors.nom.message }}</strong>
              </span>
            </div>
            <b-form-group label-for="superficie">
              <template #label>
                <span class="form-label"
                  >Superficie <span class="text-danger">*</span></span
                >
              </template>
              <b-input-group>
                <b-form-input
                  id="superficie"
                  v-model="emplacement.superficie"
                  type="text"
                  :class="{ 'is-invalid': errors.superficie.exist }"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-input-group-text class="bg-transparent font-weight-bold">
                    m²
                  </b-input-group-text>
                </b-input-group-append>
                <span
                  v-if="errors.superficie.exist"
                  class="invalid-feedback"
                  role="alert"
                >
                  <strong>{{ errors.superficie.message }}</strong>
                </span>
              </b-input-group>
            </b-form-group>
            <v-app>
              <v-autocomplete
                v-model="emplacement.zone_id"
                :items="zones"
                item-text="nom"
                item-value="id"
                outlined
                dense
                :error="errors.zone_id.exist"
                :error-messages="errors.zone_id.message"
              >
                <template #label>
                  Choix de la zone
                  <span class="red--text"><strong>* </strong></span>
                </template>
                <template #item="data">
                  {{ data.item.niveau.pavillon.site.nom }}
                  {{ data.item.niveau.pavillon.nom }}
                  {{ data.item.niveau.nom }}
                  {{ data.item.nom }}
                </template>
              </v-autocomplete>
            </v-app>
            <b-form-group label-for="caution">
              <template #label>
                <span class="form-label">Caution </span>
              </template>
              <b-input-group>
                <b-form-input
                  id="caution"
                  v-model="emplacement.caution"
                  type="text"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-input-group-text class="bg-transparent font-weight-bold">
                    Mois
                  </b-input-group-text>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
          <div class="col-md-6 col-sm-6">
            <b-form-group label-for="pas_porte">
              <template #label>
                <span class="form-label">Pas de porte</span>
              </template>
              <b-input-group>
                <b-form-input
                  id="pas_porte"
                  v-model="emplacement.pas_porte"
                  type="text"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-input-group-text class="bg-transparent font-weight-bold">
                    FCFA
                  </b-input-group-text>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group label-for="loyer">
              <template #label>
                <span class="form-label"
                  >Loyer <span class="text-danger">*</span></span
                >
              </template>
              <b-input-group>
                <b-form-input
                  id="loyer"
                  v-model="emplacement.loyer"
                  type="text"
                  :class="{ 'is-invalid': errors.loyer.exist }"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-input-group-text class="bg-transparent font-weight-bold">
                    FCFA
                  </b-input-group-text>
                </b-input-group-append>
                <span
                  v-if="errors.loyer.exist"
                  class="invalid-feedback"
                  role="alert"
                >
                  <strong>{{ errors.loyer.message }}</strong>
                </span>
              </b-input-group>
            </b-form-group>
            <v-app>
              <v-autocomplete
                v-model="emplacement.type_emplacement_id"
                :items="types"
                item-text="nom"
                item-value="id"
                outlined
                dense
                :error="errors.type_emplacement_id.exist"
                :error-messages="errors.type_emplacement_id.message"
                append-outer-icon="mdi-plus-thick"
                @click:append-outer="$bvModal.show('modalCreateTypempl')"
              >
                <template #label>
                  Type d'emplacement
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
            </v-app>
          </div>
        </div>
        <CreateTypemplacementModal :marches="marches" @pushed="onPushed" />
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
import CreateTypemplacementModal from '../typEmplacement/CreateTypemplacementModal.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: { CreateTypemplacementModal },
  props: {
    types: {
      type: Array,
      required: true,
    },
    marches: {
      type: Array,
      required: true,
    },
    zones: {
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
    emplacement: {
      id: null,
      nom: '',
      superficie: '',
      loyer: '',
      pas_porte: '',
      zone_id: null,
      type_emplacement_id: null,
      caution: null,
    },
    errors: {
      nom: { exist: false, message: null },
      superficie: { exist: false, message: null },
      loyer: { exist: false, message: null },
      zone_id: { exist: false, message: null },
      type_emplacement_id: { exist: false, message: null },
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
    this.emplacement.id = this.current.id
    this.emplacement.nom = this.current.nom
    this.emplacement.superficie = this.current.superficie
    this.emplacement.loyer = this.current.loyer
    this.emplacement.pas_porte = this.current.pas_porte
    this.emplacement.zone_id = this.current.zone_id
    this.emplacement.type_emplacement_id = this.current.type_emplacement_id
    this.emplacement.caution = this.current.caution
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/emplacement/modifier',
    }),
    save() {
      this.modifier(this.emplacement)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.$bvModal.hide('modalEditEmplacement')
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
      this.emplacement = {
        id: null,
        nom: '',
        superficie: '',
        loyer: '',
        pas_porte: '',
        zone_id: null,
        type_emplacement_id: null,
        caution: null,
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
    onPushed(id) {
      this.emplacement.type_emplacement_id = id
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
