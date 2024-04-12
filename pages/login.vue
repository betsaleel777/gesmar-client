<template>
  <div class="d-flex justify-content-center wrapper-login bg-transparent">
    <!-- <nuxt-img src="/images/bermuda-circle.svg" loading="lazy" class-name="svg-bg" /> -->
    <div class="card my-auto card-login shadow-lg">
      <div class="card-header text-center bg-primary">
        <h4 class="card-title text-white text-uppercase">Bienvenue dans Gesmar</h4>
      </div>
      <div class="card-body">
        <b-overlay :show="processing" spinner-variant="primary" rounded="sm">
          <form @submit.prevent="login()">
            <div class="signin-form">
              <div class="form-group">
                <label>Adresse Email</label>
                <input
                  v-model="utilisateur.email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email.exist }"
                  placeholder="Entrer votre adresse email"
                />
                <span v-if="errors.email.exist" class="invalid-feedback" role="alert">
                  <strong>{{ errors.email.message }}</strong>
                </span>
              </div>
              <div class="form-group">
                <label class="d-flex justify-content-between">
                  <span>Mot de passe</span>
                </label>
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
              <b-overlay :show="processing" rounded opacity="0.6" spinner-small spinner-variant="primary">
                <div class="form-group d-flex mg-b-0">
                  <button type="submit" class="btn btn-brand-01 btn-uppercase flex-fill text-white rounded-5">
                    Se connecter
                  </button>
                </div>
              </b-overlay>
            </div>
          </form>
        </b-overlay>
      </div>
    </div>
  </div>
</template>
<script>
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
export default {
  layout: 'empty',
  data() {
    return {
      utilisateur: {
        email: '',
        password: '',
      },
      errors: {
        email: { exist: false, message: null },
        password: { exist: false, message: null },
      },
      processing: false,
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: '/lib/@fortawesome/fontawesome-free/css/all.min.css',
        },
      ],
    }
  },
  methods: {
    login() {
      this.processing = true
      this.$auth
        .loginWith('laravelSanctum', { data: this.utilisateur })
        .then(() => {
          this.$gates.setRoles([this.user.role.name])
          this.$gates.setPermissions(this.user.permissions)
        })
        .catch((err) => {
          const { data } = err.response
          if (data && data.credentials) {
            this.$root.$bvToast.toast(data.message, {
              title: "echec de l'opération".toLocaleUpperCase(),
              variant: 'danger',
              solid: true,
            })
          } else {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
        .finally(() => (this.processing = false))
    },
  },
}
</script>
<style scoped>
.wrapper-login {
  height: 100%;
}
.card-login {
  width: 75%;
}
@media (min-width: 640px) {
  .card-login {
    width: 50%;
  }
}
@media screen and (min-width: 768px) {
  .card-login {
    width: 40%;
  }
}
@media screen and (min-width: 1024px) {
  .card-login {
    width: 30%;
  }
}
</style>
