<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Nouveau type d'emplacement</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
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
  emits: ['pushed'],
  data: () => ({
    submiting: false,
    type: {
      nom: '',
      prefix: '',
      site_id: '',
      auto_valid: false,
      equipable: false,
    },
    errors: {
      nom: { exist: false, message: null },
      prefix: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  async fetch() {
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
    ...mapActions({ ajouter: MODULES.TYPE.EMPLACEMENT.ACTIONS.ADD, getSites: MODULES.SITE.ACTIONS.ALL }),
    save() {
      this.submiting = true
      this.ajouter(this.type)
        .then(({ message, id }) => {
          this.$emit('pushed', id)
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
<style>
/* .v-application--wrap {
  min-height: fit-content;
} */
</style>
