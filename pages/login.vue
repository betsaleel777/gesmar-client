<template>
  <div class="signin-panel">
    <nuxt-img src="/images/bermuda-circle.svg" loading="lazy" class-name="svg-bg" />
    <div class="signin-sidebar">
      <div class="signin-sidebar-body">
        <a href="dashboard-one.html" class="sidebar-logo mg-b-40"><span>Gesmar</span></a>
        <h4 class="signin-title">Bienvenue Gesmar</h4>
        <h5 class="signin-subtitle">Se Connecter</h5>
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
                <button type="submit" class="btn btn-brand-01 btn-uppercase flex-fill">Se connecter</button>
              </div>
            </b-overlay>
          </div>
        </form>
      </div>
      <!-- signin-sidebar-body -->
    </div>
    <!-- signin-sidebar -->
  </div>
  <!-- signin-panel -->
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
        { rel: 'stylesheet', href: '/lib/ionicons/css/ionicons.min.css' },
        { rel: 'stylesheet', href: '/css/cassie.css' },
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
