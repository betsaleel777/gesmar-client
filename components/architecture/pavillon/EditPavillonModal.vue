<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le pavillon {{ pavillon.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
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
  async fetch() {
    try {
      await this.getMarches()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
    const { pavillon } = await this.getOne(this.id)
    this.pavillon = pavillon
  },
  computed: {
    ...mapGetters({ sites: MODULES.SITE.GETTERS.SITES }),
  },
  methods: {
    ...mapActions({
      getMarches: MODULES.SITE.ACTIONS.ALL,
      getOne: MODULES.PAVILLON.ACTIONS.ONE,
      modifier: MODULES.PAVILLON.ACTIONS.EDIT,
    }),
    save() {
      this.submiting = true
      this.modifier(this.pavillon)
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
<style scoped></style>
