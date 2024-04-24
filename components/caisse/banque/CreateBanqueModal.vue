<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Création de banque</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom de Banque<span class="text-danger">*</span></label>
          <input
            v-model="compte.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer le nom de la banque"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group required">
          <label class="form-label mg-t-10">Sigle de la banque<span class="text-danger">*</span></label>
          <input
            v-model="compte.sigle"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.sigle.exist }"
            placeholder="Entrer le sigle de la banque"
          />
          <span v-if="errors.sigle.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.sigle.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="compte.site_id"
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
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  data: () => ({
    submiting: false,
    compte: { nom: '', sigle: '', site_id: null },
    errors: {
      nom: { exist: false, message: null },
      sigle: { exist: false, message: null },
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
    ...mapGetters({ marches: MODULES.SITE.GETTERS.SITES }),
  },
  methods: {
    ...mapActions({ ajouter: MODULES.BANQUE.ACTIONS.ADD, getSites: MODULES.SITE.ACTIONS.ALL }),
    save() {
      this.submiting = true
      this.ajouter(this.compte)
        .then(({ message }) => {
          this.dialog = false
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
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
