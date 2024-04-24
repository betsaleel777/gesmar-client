<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveaux commercial</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <v-app>
          <v-autocomplete
            v-model="commercial.user_id"
            :items="users"
            item-text="name"
            item-value="id"
            outlined
            dense
            :error="errors.user_id.exist"
            :error-messages="errors.user_id.message"
          >
            <template #label>
              Choix de l'utilisateur
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="commercial.site_id"
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
    commercial: {
      user_id: null,
      site_id: null,
    },
    errors: {
      user_id: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    try {
      await this.getSites()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
    try {
      await this.getUncommercials()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
  },
  computed: {
    ...mapGetters({
      users: MODULES.USER.GETTERS.USERS,
      marches: MODULES.SITE.GETTERS.SITES,
    }),
  },
  methods: {
    ...mapActions({
      ajouter: MODULES.COMMERCIAL.ACTIONS.ADD,
      getUncommercials: MODULES.USER.ACTIONS.UNCOMMERCIAL,
      getSites: MODULES.SITE.ACTIONS.ALL,
    }),
    save() {
      this.submiting = true
      this.ajouter(this.commercial)
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
