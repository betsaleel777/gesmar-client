<template>
  <b-modal v-model="dialog" scrollable size="lg">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouvel utilisateur</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <form ref="form" enctype="multipart/form-data">
          <div class="form-group required">
            <ImagePreview v-model="utilisateur.avatar" :error-state="errors.avatar.exist" />
            <div v-if="errors.avatar.exist" class="text-danger text-thin" role="alert">
              <strong>{{ errors.avatar.message }}</strong>
            </div>
            <label class="form-label mg-t-10">Nom complet</label>
            <input
              v-model="utilisateur.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name.exist }"
              placeholder="Entrer votre nom complet"
            />
            <span v-if="errors.name.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.name.message }}</strong>
            </span>
          </div>
          <div class="form-group required">
            <label class="form-label">Mot de passe</label>
            <input
              v-model="utilisateur.password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password.exist }"
              placeholder="Entrer votre mot de passe"
            />
            <span v-if="errors.password.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.password.message }}</strong>
            </span>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmation de mot de passe</label>
            <input
              v-model="utilisateur.password_confirmation"
              type="password"
              class="form-control"
              placeholder="Confirmez le mot de passe"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="utilisateur.email"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.email.exist }"
              placeholder="Entrer votre email"
            />
            <span v-if="errors.email.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.email.message }}</strong>
            </span>
          </div>
          <div class="form-group">
            <label class="form-label">Adresse</label>
            <input
              v-model="utilisateur.adresse"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.adresse.exist }"
              placeholder="Entrer votre adresse"
            />
            <span v-if="errors.adresse.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.adresse.message }}</strong>
            </span>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea
              v-model="utilisateur.description"
              name="description"
              class="form-control"
              rows="3"
            ></textarea>
          </div>
          <v-app>
            <v-autocomplete
              v-model="utilisateur.sites"
              :items="sites"
              item-text="nom"
              item-value="id"
              dense
              chips
              small-chips
              multiple
              outlined
              :error="errors.sites.exist"
              :error-messages="errors.sites.message"
            >
              <template #label>
                Choix du marché
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="utilisateur.role_id"
              :items="roles"
              item-text="name"
              item-value="id"
              outlined
              dense
              :error="errors.role_id.exist"
              :error-messages="errors.role_id.message"
            >
              <template #label>
                Choix des roles
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
import ImagePreview from '~/components/tools/ImagePreview.vue'
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  components: { ImagePreview },
  mixins: [modal],
  data: () => ({
    submiting: false,
    utilisateur: {
      name: '',
      email: '',
      description: '',
      adresse: '',
      password: '',
      password_confirmation: null,
      avatar: '',
    },
    errors: {
      avatar: { exist: false, message: null },
      name: { exist: false, message: null },
      adresse: { exist: false, message: null },
      email: { exist: false, message: null },
      password: { exist: false, message: null },
      sites: { exist: false, message: null },
      role_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    try {
      await this.getSites()
    } catch (error) {
      this.$notify({ text: error.response.data.message, title: 'opération compromise', type: 'error' })
    }
    try {
      await this.getRoles()
    } catch (error) {
      this.$notify({ text: error.response.data.message, title: 'opération compromise', type: 'error' })
    }
  },
  computed: {
    ...mapGetters({ sites: MODULES.SITE.GETTERS.SITES, roles: MODULES.ROLE.GETTERS.ADMIN_WITHOUT }),
  },
  methods: {
    ...mapActions({
      ajouter: MODULES.ROLE.ACTIONS.ADD,
      getRoles: MODULES.ROLE.ACTIONS.ALL,
      getSites: MODULES.SITE.ACTIONS.ALL,
    }),
    save() {
      this.submiting = true
      const data = new FormData()
      for (const key in this.utilisateur) {
        data.append(key, this.utilisateur[key])
      }
      this.ajouter(data)
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
