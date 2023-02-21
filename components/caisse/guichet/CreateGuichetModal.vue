<template>
  <b-modal id="modalCreateGuichet" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création de guichet</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom du guichet<span class="text-danger">*</span></label>
          <input
            v-model="guichet.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom du guichet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="guichet.site_id"
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
      </form>
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
    guichet: {
      nom: '',
      site_id: null,
    },
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters('architecture/marche', ['marches']),
  },
  mounted() {
    this.getSites()
  },
  methods: {
    ...mapActions({ ajouter: 'caisse/guichet/ajouter', getSites: 'architecture/marche/getAll' }),
    save() {
      this.ajouter(this.guichet)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateGuichet')
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
      this.guichet = {
        nom: '',
        site_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateGuichet')
    },
  },
}
</script>
<style></style>
