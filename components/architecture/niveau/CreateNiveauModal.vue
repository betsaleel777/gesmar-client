<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouveau Niveau</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-switch
            v-model="niveau.automatiq"
            :label="niveau.automatiq ? 'automatique' : 'manuel'"
          ></v-switch>
          <v-autocomplete
            v-model="niveau.pavillon_id"
            :items="pavillons"
            :loading="loading"
            :search-input.sync="search"
            item-text="texte"
            item-value="id"
            cache-items
            outlined
            dense
            :error="errors.pavillon_id.exist"
            :error-messages="errors.pavillon_id.message"
          >
            <template #label>
              Choix du pavillon
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
        </v-app>
        <div v-if="!niveau.automatiq" class="form-group">
          <label class="form-label">Nom<span class="text-danger">*</span></label>
          <input
            v-model="niveau.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div v-else class="form-group">
          <label>Nombre de niveaux <span class="text-danger">*</span></label>
          <input
            v-model="niveau.nombre"
            class="form-control"
            :class="{ 'is-invalid': errors.nombre.exist }"
          />
          <span v-if="errors.nombre" class="invalid-feedback" role="alert">
            <strong>{{ errors.nombre.message }}</strong>
          </span>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  data: () => ({
    submiting: false,
    pavillons: [],
    loading: false,
    search: null,
    timer: null,
    niveau: {
      nom: '',
      pavillon_id: '',
      nombre: null,
      automatiq: false,
    },
    errors: {
      nom: { exist: false, message: null },
      pavillon_id: { exist: false, message: null },
      nombre: { exist: false, message: null },
    },
  }),
  watch: {
    search(val) {
      val && val !== this.niveau.pavillon_id && this.querySelections(val)
    },
  },
  methods: {
    ...mapActions({
      ajouter: MODULES.NIVEAU.ACTIONS.ADD,
      getSearch: MODULES.PAVILLON.ACTIONS.SEARCH,
    }),
    save() {
      this.submiting = true
      this.ajouter(this.niveau)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
    querySelections(search) {
      this.loading = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getSearch(search)
          .then((pavillons) => (this.pavillons = pavillons))
          .finally(() => (this.loading = false))
      }, 1150)
    },
  },
}
</script>
<style scoped></style>
