<template>
  <b-modal id="modalCreateEncaissement" size="xl" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création d'un encaissement</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-container>
                  <v-autocomplete
                    v-model="encaissement.caissier_id"
                    :items="caissiers"
                    item-text="user.name"
                    item-value="id"
                    outlined
                    dense
                    :error="errors.caissier_id.exist"
                    :error-messages="errors.caissier_id.message"
                    @change="exists"
                  >
                    <template #label>
                      Choix du caisier
                      <span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                  <v-autocomplete
                    v-model="encaissement.ordonnancement_id"
                    :items="ordonnancements"
                    item-text="code"
                    item-value="id"
                    outlined
                    dense
                    :error="errors.ordonnancement_id.exist"
                    :error-messages="errors.ordonnancement_id.message"
                    :disabled="disabled"
                    @change="infos"
                  >
                    <template #label>
                      Code d'ordonnancement
                      <span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                </v-container>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="4">
                <InfosContrat
                  v-if="Object.keys(ordonnancement).length !== 0"
                  :ordonnancement="ordonnancement"
                />
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="5">
                <CashForm
                  v-if="Object.keys(ordonnancement).length !== 0"
                  v-model="encaissement"
                  :ordonnancement="ordonnancement"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-app>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InfosContrat from './InfosContrat.vue'
import CashForm from './CashForm.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: { InfosContrat, CashForm },
  data: () => ({
    menu: null,
    disabled: true,
    ordonnancement: {},
    encaissement: {
      caissier_id: null,
      ordonnancement_id: null,
    },
    errors: {
      caissier_id: { exist: false, message: null },
      ordonnancement_id: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters({
      ordonnancements: 'exploitation/ordonnancement/ordonnancements',
      caissiers: 'caisse/caissier/caissiers',
    }),
  },
  mounted() {
    this.getCaissiers()
    this.getOrdonnancements()
  },
  methods: {
    ...mapActions({
      ajouter: 'caisse/encaissement/ajouter',
      getCaissiers: 'caisse/caissier/getAll',
      getOrdonnancements: 'exploitation/ordonnancement/getAll',
      getOne: 'exploitation/ordonnancement/getOne',
      ouvertureExists: 'caisse/ouverture/ouvertureExists',
    }),
    save() {
      this.ajouter(this.encaissement)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateEncaissement')
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
      this.disabled = true
      this.ordonnancement = {}
      this.encaissement = {
        caissier_id: null,
        ordonnancement_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateEncaissement')
    },
    exists() {
      if (this.encaissement.caissier_id) {
        this.ouvertureExists(this.encaissement.caissier_id).then((exists) => {
          exists
            ? (this.disabled = false)
            : this.$bvToast.toast("le caissier sélectionné n'est pas programmé pour aujourd'hui", {
                title: 'ATTENTION'.toLocaleUpperCase(),
                variant: 'warning',
                solid: true,
              })
        })
      }
    },
    infos() {
      if (this.encaissement.ordonnancement_id) {
        this.getOne(this.encaissement.ordonnancement_id).then(({ ordonnancement }) => {
          this.ordonnancement = ordonnancement
        })
      }
    },
  },
}
</script>
<style></style>
