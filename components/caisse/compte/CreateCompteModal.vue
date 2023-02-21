<template>
  <b-modal id="modalCreateCompte" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création de compte</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom de Banque<span class="text-danger">*</span></label>
          <input
            v-model="compte.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer le nom de la banque"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group required">
          <label class="form-label mg-t-10">Code du compte<span class="text-danger">*</span></label>
          <input
            v-model="compte.code"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.code.exist }"
            placeholder="Entrer le code du modalCreateCompte"
          />
          <span v-if="errors.code.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.code.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="compte.site_id"
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
    compte: {
      nom: '',
      code: '',
      site_id: null,
    },
    errors: {
      nom: { exist: false, message: null },
      code: { exist: false, message: null },
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
    ...mapActions({ ajouter: 'caisse/compte/ajouter', getSites: 'architecture/marche/getAll' }),
    save() {
      this.ajouter(this.compte)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateCompte')
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
      this.compte = {
        nom: '',
        code: '',
        site_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateCompte')
    },
  },
}
</script>
<style></style>
