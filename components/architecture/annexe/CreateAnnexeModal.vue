<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveau Service Annexe</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
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
          <textarea v-model="annexe.description" class="form-control" rows="5"></textarea>
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
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import { ANNEXE } from '~/helper/constantes'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
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
  async fetch() {
    await this.getSites()
  },
  computed: {
    ...mapGetters({ marches: MODULES.SITE.GETTERS.SITES }),
  },
  methods: {
    ...mapActions({ ajouter: MODULES.ANNEXE.ACTIONS.ADD, getSites: MODULES.SITE.ACTIONS.ALL }),
    save() {
      this.submiting = true
      this.ajouter(this.annexe)
        .then(({ message }) => {
          this.dialog = false
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
