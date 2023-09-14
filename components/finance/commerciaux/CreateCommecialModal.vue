<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveaux commercial</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
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
  props: {
    value: Boolean,
  },
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
    await this.getUncommercials()
    await this.getSites()
  },
  computed: {
    ...mapGetters({
      users: 'user-role/user/users',
      marches: 'architecture/marche/marches',
    }),
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    ...mapActions({
      ajouter: 'finance/commercial/ajouter',
      getUncommercials: 'user-role/user/getUncommercials',
      getSites: 'architecture/marche/getAll',
    }),
    save() {
      this.submiting = true
      this.ajouter(this.commercial)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.dialog = false
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
      this.commercial = {}
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style></style>
