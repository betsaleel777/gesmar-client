<template>
  <b-modal id="modalCreateCommercial" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveaux commercial</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
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
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" class="btn btn-primary text-white" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  data: () => ({
    commercial: {
      user_id: null,
      site_id: null,
    },
    errors: {
      user_id: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters({
      users: 'user-role/user/users',
      marches: 'architecture/marche/marches',
    }),
  },
  async mounted() {
    await this.getUncommercials()
    await this.getSites()
  },
  methods: {
    ...mapActions({
      ajouter: 'finance/commercial/ajouter',
      getUncommercials: 'user-role/user/getUncommercials',
      getSites: 'architecture/marche/getAll',
    }),
    save() {
      this.ajouter(this.commercial)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateCommercial')
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
    },
    reset() {
      this.commercial = {
        user_id: null,
        site_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateCommercial')
    },
  },
}
</script>
<style></style>
