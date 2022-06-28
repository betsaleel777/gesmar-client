<template>
  <div class="signin-panel">
    <!-- <svg-to-inline
      path="http://themepixels.me/cassie/assets/svg/citywalk.svg"
      class-name="svg-bg"
    ></svg-to-inline> -->
    <div class="signin-sidebar">
      <div class="signin-sidebar-body">
        <a href="dashboard-one.html" class="sidebar-logo mg-b-40"
          ><span>Gesmar</span></a
        >
        <h4 class="signin-title">Bienvenue Gesmar</h4>
        <h5 class="signin-subtitle">Se Connectez</h5>
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
              <span
                v-if="errors.email.exist"
                class="invalid-feedback"
                role="alert"
              >
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
              <span
                v-if="errors.password.exist"
                class="invalid-feedback"
                role="alert"
              >
                <strong>{{ errors.password.message }}</strong>
              </span>
            </div>
            <div class="form-group d-flex mg-b-0">
              <button
                type="submit"
                class="btn btn-brand-01 btn-uppercase flex-fill"
              >
                Se connecter
              </button>
            </div>
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
  layout: 'vide',
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
  mounted() {
    this.$axios.$get('/sanctum/csrf-cookie')
  },
  methods: {
    login() {
      this.$auth
        .loginWith('laravelSanctum', { data: this.utilisateur })
        .then(() => {
          // this.$gates.setPermissions(this.profile.permissions)
          this.$router.push('/')
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
    },
  },
}
</script>
