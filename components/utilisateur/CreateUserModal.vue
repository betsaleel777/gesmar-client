<template>
  <b-modal id="modalCreateUser" scrollable size="lg" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouvel utilisateur</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
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
        <!-- form-group -->
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea
            v-model="utilisateur.description"
            name="description"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" class="btn btn-primary text-white" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import ImagePreview from '~/components/tools/ImagePreview.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: {
    ImagePreview,
  },
  data: () => ({
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
    },
  }),
  methods: {
    ...mapActions('user-role/user', ['ajouter']),
    save() {
      const data = new FormData()
      for (const key in this.utilisateur) {
        data.append(key, this.utilisateur[key])
      }
      this.ajouter(data)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateUser')
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
      this.utilisateur = {
        name: '',
        email: '',
        description: '',
        adresse: '',
        password: '',
        password_confirmation: null,
        avatar: '',
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateUser')
    },
  },
}
</script>
<style></style>
