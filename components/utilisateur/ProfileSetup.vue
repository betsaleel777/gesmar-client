<template>
  <div id="paneProfile" class="tab-pane active">
    <h6 class="tx-uppercase tx-semibold tx-color-01 mg-b-0">Informations de profil</h6>
    <hr />
    <div class="form-settings">
      <form enctype="multipart/form-data">
        <div class="form-group">
          <div v-if="!utilisateur.image" class="avatar avatar-xxl">
            <img
              v-if="utilisateur.avatar"
              :src="utilisateur.avatar"
              class="rounded-circle"
              alt="image de profil"
            />
            <img v-else src="https://via.placeholder.com/500/637382/fff" class="rounded-circle" alt="" />
          </div>
          <ImagePreview v-model="utilisateur.image" />
          <label class="form-label mg-t-5">Nom complet</label>
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
          <div class="tx-11 tx-sans tx-color-04 mg-t-5">
            Votre nom peut apparaître ici où on parle de vous. Vous pouvez le modifier à tout moment.
          </div>
        </div>
        <!-- form-group -->
        <div class="form-group">
          <label class="form-label">Description Utilisateur</label>
          <textarea
            v-model="utilisateur.description"
            name="description"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
        <!-- form-group -->
        <div class="form-group">
          <label class="form-label">Aller au profil</label>
          <nuxt-link :to="`/parametre/utilisateur/${id}/profile`"
            >lien vers le profile de l'utilisateur
            {{ utilisateur.name }}
          </nuxt-link>
        </div>
        <!-- form-group -->
        <div class="form-group">
          <label class="form-label">Adresse</label>
          <input
            v-model="utilisateur.adresse"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.adresse.exist }"
            placeholder="Adresse utilisateur"
          />
          <span v-if="errors.adresse.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.adresse.message }}</strong>
          </span>
        </div>
        <!-- form-group -->
        <div class="form-group tx-13 tx-color-04">
          vous nous donnez votre consentement pour partager ces données où que vous soyez.
        </div>
        <hr class="op-0" />
        <button type="button" :disabled="submiting" class="btn btn-brand-02" @click="save">
          Modifier le profile
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ImagePreview from '../tools/ImagePreview.vue'
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
export default {
  components: {
    ImagePreview,
  },
  props: {
    profileData: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    utilisateur: {
      image: null,
      avatar: null,
      name: null,
      description: null,
      adresse: null,
    },
    errors: {
      name: { exist: false, message: null },
      adresse: { exist: false, message: null },
    },
    baseURL: process.env.API || 'http://localhost:8000/',
  }),
  mounted() {
    this.utilisateur = this.profileData
  },
  methods: {
    ...mapActions('user-role/user', ['profile']),
    save() {
      this.submiting = true
      const data = new FormData()
      for (const key in this.utilisateur) {
        data.append(key, this.utilisateur[key])
      }
      this.profile(data)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'succès de la modification'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          location.reload()
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
  },
}
</script>
<style></style>
