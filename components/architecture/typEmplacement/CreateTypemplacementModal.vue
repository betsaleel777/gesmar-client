<template>
  <b-modal id="modalCreateTypempl" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Nouveau type d'emplacement
      </h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom complet</label>
          <input
            v-model="type.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group required">
          <label class="form-label mg-t-10"
            >Préfixe Ex:(mag pour magasin)</label
          >
          <input
            v-model="type.prefix"
            type="text"
            :class="{ 'is-invalid': errors.prefix.exist }"
            class="form-control"
          />
          <span
            v-if="errors.prefix.exist"
            class="invalid-feedback"
            role="alert"
          >
            <strong>{{ errors.prefix.message }}</strong>
          </span>
        </div>
        <div class="form-group">
          <v-app>
            <v-autocomplete
              v-model="type.site_id"
              :items="marches"
              item-text="nom"
              item-value="id"
              outlined
              dense
              label="choix du pavillon"
              :error="errors.site_id.exist"
              :error-messages="errors.site_id.message"
            ></v-autocomplete>
          </v-app>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="reset"
      >
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    type: {
      nom: '',
      prefix: '',
      site_id: '',
    },
    errors: {
      nom: { exist: false, message: null },
      prefix: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/typEmplacement', ['ajouter']),
    save() {
      this.ajouter(this.type)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateTypempl')
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
      this.type = {
        nom: '',
        prefix: '',
        site_id: '',
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateTypempl')
    },
  },
}
</script>
<style></style>
