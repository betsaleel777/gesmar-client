<template>
  <b-modal id="modalCreateCaissier" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveaux caissier</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
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
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  data: () => ({
    submiting: false,
    caissier: {
      user_id: null,
    },
    errors: {
      user_id: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters('user-role/user', ['users']),
  },
  mounted() {
    this.getUncashiers()
  },
  methods: {
    ...mapActions('caisse/caissier', ['ajouter']),
    ...mapActions('user-role/user', ['getUncashiers']),
    save() {
      this.submiting = true
      this.ajouter(this.caissier)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateCaissier')
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
    reset() {
      this.caissier = {
        user_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateCaissier')
    },
  },
}
</script>
<style></style>
