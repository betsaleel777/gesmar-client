<template>
  <v-app>
    <b-modal id="modalCreateNiveau" scrollable @show="initState">
      <template #modal-header>
        <h5 id="archiver" class="modal-title text-primary">Nouveau Niveau</h5>
        <button type="button" class="close" aria-label="Close" @click="close">
          <span aria-hidden="true"><feather type="x" /></span>
        </button>
      </template>
      <template #default>
        <form ref="form">
          <div class="form-group">
            <v-app>
              <v-switch
                v-model="niveau.automatiq"
                :label="niveau.automatiq ? 'automatique' : 'manuel'"
                @change="initState(true)"
              ></v-switch>
              <v-autocomplete
                v-model="niveau.pavillon_id"
                :items="pavillons"
                item-text="nom"
                item-value="id"
                outlined
                dense
                label="choix du pavillon"
                :error="errors.pavillon_id.exist"
                :error-messages="errors.pavillon_id.message"
              >
                <template #item="data">
                  {{ data.item.site.nom }} {{ data.item.nom }}
                </template>
              </v-autocomplete>
            </v-app>
          </div>
          <div v-if="!niveau.automatiq" class="form-group">
            <label class="form-label">Nom</label>
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
            <label>Nombre de niveaux</label>
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
        <button
          type="button"
          class="btn btn-warning"
          data-dismiss="modal"
          @click="close"
        >
          Fermer
        </button>
        <button type="button" class="btn btn-primary" @click="save">
          Valider
        </button>
      </template>
    </b-modal>
  </v-app>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    pavillons: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
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
  methods: {
    ...mapActions({
      ajouter: 'architecture/niveau/ajouter',
    }),
    save() {
      this.ajouter(this.niveau)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.$bvModal.hide('modalCreateNiveau')
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
    },
    initState(autoValueChange = false) {
      errorsInitialise(this.errors)
      if (autoValueChange) {
        this.niveau.nom = ''
        this.niveau.pavillon_id = ''
        this.niveau.nombre = null
      } else {
        this.niveau = {
          nom: '',
          pavillon_id: '',
          nombre: null,
          automatiq: false,
        }
      }
    },
    close() {
      this.initState()
      this.$bvModal.hide('modalCreateNiveau')
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
