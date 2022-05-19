<template>
  <v-app>
    <b-modal id="modalCreatePavillon" scrollable @show="initState">
      <template #modal-header>
        <h5 id="archiver" class="modal-title text-primary">Nouveau Pavillon</h5>
        <button type="button" class="close" aria-label="Close" @click="close">
          <span aria-hidden="true"><feather type="x" /></span>
        </button>
      </template>
      <template #default>
        <form ref="form">
          <div class="form-group">
            <v-app>
              <v-switch
                v-model="pavillon.automatiq"
                :label="pavillon.automatiq ? 'automatique' : 'manuel'"
                @change="initState(true)"
              ></v-switch>
              <v-autocomplete
                v-model="pavillon.site_id"
                :items="marches"
                item-text="nom"
                item-value="id"
                outlined
                dense
                label="choix du marché"
                :error="errors.site_id.exist"
                :error-messages="errors.site_id.message"
              ></v-autocomplete>
            </v-app>
          </div>
          <div v-if="!pavillon.automatiq" class="form-group">
            <label class="form-label">Nom</label>
            <input
              v-model="pavillon.nom"
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
            <label>Nombre de pavillons</label>
            <input
              v-model="pavillon.nombre"
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
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    pavillon: {
      nom: '',
      site_id: '',
      nombre: null,
      automatiq: false,
    },
    errors: {
      nom: { exist: false, message: null },
      site_id: { exist: false, message: null },
      nombre: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions({
      ajouter: 'architecture/pavillon/ajouter',
    }),
    save() {
      this.ajouter(this.pavillon)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreatePavillon')
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
    initState(autoValueChange = false) {
      errorsInitialise(this.errors)
      if (autoValueChange) {
        this.pavillon.nom = ''
        this.pavillon.site_id = ''
        this.pavillon.nombre = null
      } else {
        this.pavillon = {
          nom: '',
          site_id: '',
          nombre: null,
          automatiq: false,
        }
      }
    },
    close() {
      this.initState()
      this.$bvModal.hide('modalCreatePavillon')
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
