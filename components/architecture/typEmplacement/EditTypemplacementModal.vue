<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 v-if="!$fetchState.pending" class="modal-title text-primary">
        Modifier le type d'emplacement {{ type.nom }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <form v-if="!$fetchState.pending">
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
            <label class="form-label mg-t-5">Nom complet<span class="text-danger">*</span></label>
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
            <label class="form-label mg-t-5"
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
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <b-form-group label-for="frais_dossier">
                <template #label>
                  <span class="form-label">Frais de dossier <span class="text-danger">*</span></span>
                </template>
                <b-input-group>
                  <b-form-input
                    id="superficie"
                    v-model="type.frais_dossier"
                    type="text"
                    :class="{ 'is-invalid': errors.frais_dossier.exist }"
                    class="form-control"
                  />
                  <b-input-group-append>
                    <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
                  </b-input-group-append>
                  <span v-if="errors.frais_dossier.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.frais_dossier.message }}</strong>
                  </span>
                </b-input-group>
              </b-form-group>
            </div>
            <div class="col-md-6 col-sm-12">
              <b-form-group label-for="frais_amenagement">
                <template #label>
                  <span class="form-label">Frais d'aménagement <span class="text-danger">*</span></span>
                </template>
                <b-input-group>
                  <b-form-input
                    id="superficie"
                    v-model="type.frais_amenagement"
                    type="text"
                    :class="{ 'is-invalid': errors.frais_amenagement.exist }"
                    class="form-control"
                  />
                  <b-input-group-append>
                    <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
                  </b-input-group-append>
                  <span v-if="errors.frais_amenagement.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.frais_amenagement.message }}</strong>
                  </span>
                </b-input-group>
              </b-form-group>
            </div>
          </div>
          <v-app>
            <v-autocomplete
              v-model="type.site.id"
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
        </form>
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
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    type: null,
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
      frais_dossier: { exist: false, message: null },
      frais_amenagement: { exist: false, message: null },
      prefix: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { type } = await this.getOne(this.id)
    this.type = type
    this.type.site_id = type.site.id
    try {
      await this.getSites()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
  },
  computed: {
    ...mapGetters({ sites: MODULES.SITE.GETTERS.SITES }),
  },
  methods: {
    ...mapActions({
      modifier: MODULES.TYPE.EMPLACEMENT.ACTIONS.EDIT,
      getOne: MODULES.TYPE.EMPLACEMENT.ACTIONS.ONE,
      getSites: MODULES.SITE.ACTIONS.ALL,
    }),
    save() {
      this.submiting = true
      this.modifier(this.type)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style></style>
