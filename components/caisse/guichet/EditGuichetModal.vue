<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier guichet</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom du guichet<span class="text-danger">*</span></label>
          <input
            v-model="guichet.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom du guichet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="guichet.site_id"
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
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    guichet: {
      nom: '',
      site_id: null,
    },
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { guichet } = await this.getOne(this.id)
    this.guichet = guichet
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
    ...mapActions({
      modifier: MODULES.GUICHET.ACTIONS.EDIT,
      getSites: MODULES.SITE.ACTIONS.ALL,
      getOne: MODULES.GUICHET.ACTIONS.ONE,
    }),
    save() {
      this.submiting = true
      this.modifier(this.guichet)
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
