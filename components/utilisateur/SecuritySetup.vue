<template>
  <div id="paneSecurity" class="tab-pane">
    <h6 class="tx-uppercase tx-semibold tx-color-01 mg-b-0">
      Option de sécurité
    </h6>
    <hr />
    <div class="form-settings">
      <form>
        <div class="form-group">
          <label class="form-label">Modifier ancien mot de passe</label>
          <input
            v-model="utilisateur.oldPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.oldPassword.exist }"
            placeholder="Ancien mot de passe"
          />
          <span
            v-if="errors.oldPassword.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.oldPassword.message }}</strong>
          </span>
          <input
            v-model="utilisateur.password"
            type="text"
            class="form-control mg-t-5"
            :class="{ 'is-invalid': errors.password.exist }"
            placeholder="Nouveau mot de passe"
          />
          <span
            v-if="errors.password.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.password.message }}</strong>
          </span>
          <input
            v-model="utilisateur.password_confirmation"
            type="text"
            class="form-control mg-t-5"
            placeholder="Confirmation nouveau mot de passe"
          />
        </div>
        <!-- form-group -->
        <button type="button" class="btn btn-brand-02" @click="save">
          Modifier mot de passe
        </button>
      </form>
    </div>
    <!-- form-settings -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    utilisateur: {
      id: null,
      oldPassword: null,
      password: null,
      password_confirmation: null,
    },
    errors: {
      oldPassword: { exist: false, message: null },
      password: { exist: false, message: null },
    },
  }),
  mounted() {
    this.utilisateur.id = this.id
  },
  methods: {
    ...mapActions('user-role/user', ['security']),
    save() {
      this.security(this.utilisateur)
        .then(() => {})
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
<style></style>
