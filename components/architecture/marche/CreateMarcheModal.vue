<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveau marché</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <form ref="form">
          <div class="form-group required">
            <label class="form-label mg-t-10">Nom complet<span class="text-danger">*</span></label>
            <input
              v-model="marche.nom"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.nom.exist }"
              placeholder="Entrer le nom complet du marché"
            />
            <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.nom.message }}</strong>
            </span>
          </div>
          <v-app>
            <v-autocomplete
              v-model="marche.commune"
              :items="communes"
              item-text="COMMUNE"
              item-value="COMMUNE"
              outlined
              dense
              :error="errors.commune.exist"
              :error-messages="errors.commune.message"
            >
              <template #label>
                Commune
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="marche.pays"
              :items="pays"
              item-text="name"
              item-value="name"
              outlined
              dense
              :error="errors.pays.exist"
              :error-messages="errors.pays.message"
            >
              <template #label>
                Pays
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
          </v-app>
          <div class="form-group">
            <label class="form-label">Ville<span class="text-danger">*</span></label>
            <input
              v-model="marche.ville"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.ville.exist }"
              placeholder="Entrer la ville"
            />
            <span v-if="errors.ville.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.ville.message }}</strong>
            </span>
          </div>
          <div class="form-group">
            <label class="form-label">Adresse Postale</label>
            <input v-model="marche.postale" type="text" class="form-control" placeholder="Adresse postale" />
          </div>
        </form>
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
import { mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    marche: {
      nom: '',
      commune: '',
      ville: '',
      pays: '',
      postale: '',
    },
    communes: [],
    pays: [],
    errors: {
      nom: { exist: false, message: null },
      commune: { exist: false, message: null },
      ville: { exist: false, message: null },
      pays: { exist: false, message: null },
    },
  }),

  async fetch() {
    let response = await this.$axios.get(
      'https://data.gouv.ci/data-fair/api/v1/datasets/liste-des-circonscriptions-administratives-et-des-communes/lines?select=COMMUNE&size=252'
    )
    this.communes = response.data.results
    response = await this.$axios.get('/json/countries.json', { baseURL: 'http://localhost:3000' })
    this.pays = response.data
  },
  computed: {
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
    ...mapActions('architecture/marche', ['ajouter']),
    save() {
      this.submiting = true
      this.ajouter(this.marche)
        .then(({ message }) => {
          this.dialog = false
          this.$root.$bvToast.toast(message, {
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
        .finally(() => (this.submiting = false))
    },
    reset() {
      this.marche = {}
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style></style>
