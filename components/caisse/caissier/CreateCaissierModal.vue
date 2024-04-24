<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveaux caissier</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <v-app>
          <v-autocomplete
            v-model="caissier.user_id"
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
    caissier: { user_id: null },
    errors: { user_id: { exist: false, message: null } },
  }),
  async fetch() {
    await this.getUncashiers()
  },
  computed: {
    ...mapGetters({ users: MODULES.USER.GETTERS.USERS }),
  },
  methods: {
    ...mapActions({ ajouter: MODULES.CAISSIER.ACTIONS.ADD, getUncashiers: MODULES.USER.ACTIONS.UNCASHIER }),
    save() {
      this.submiting = true
      this.ajouter(this.caissier)
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
