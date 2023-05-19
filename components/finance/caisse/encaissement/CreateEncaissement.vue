<template>
  <b-modal v-model="dialog" size="xl" @show="reset">
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
                    @change="exists"
                  >
                    <template #label>
                      Choix du caissier
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
                  :key="key"
                  v-model="encaissement"
                  :ordonnancement="ordonnancement"
                  :messages="errors"
                  :mode="mode"
                  @statusButton="(value) => (validable = value)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-app>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" :disabled="!validable" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InfosContrat from './InfosContrat.vue'
import CashForm from './CashForm.vue'
export default {
  components: { InfosContrat, CashForm },
  props: {
    value: Boolean,
  },
  data: () => ({
    menu: null,
    disabled: true,
    ordonnancement: {},
    encaissement: {
      caissier_id: null,
      ordonnancement_id: null,
    },
    validable: false,
    errors: {},
    key: true,
    mode: 1,
  }),
  computed: {
    ...mapGetters({
      ordonnancements: 'exploitation/ordonnancement/ordonnancements',
      caissiers: 'caisse/caissier/caissiers',
    }),
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.getCaissiers()
    this.getOrdonnancements()
  },
  methods: {
    ...mapActions({
      ajouter: 'caisse/encaissement/ajouter',
      getCaissiers: 'caisse/caissier/getAll',
      getOrdonnancements: 'exploitation/ordonnancement/getAllUnpaid',
      getOne: 'exploitation/ordonnancement/getOne',
      ouvertureExists: 'caisse/ouverture/ouvertureExists',
    }),
    save() {
      this.ajouter(this.encaissement)
        .then(({ message }) => {
          this.dialog = false
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
        })
        .catch((err) => {
          const { data } = err.response
          this.mode = this.encaissement.mode
          this.errors = data
          this.key = !this.key
        })
    },
    reset() {
      this.disabled = true
      this.ordonnancement = {}
      this.encaissement = {
        caissier_id: null,
        ordonnancement_id: null,
      }
      this.validable = false
      this.errors = {}
      this.key = !this.key
      this.dialog = false
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
          this.validable = true
          this.key = !this.key
        })
      }
    },
  },
}
</script>
<!-- <style lang="scss" scoped>
::v-deep #modalCreateEncaissement > .modal-dialog {
  max-width: 100%;
}
</style> -->
