<template>
  <b-modal v-model="dialog" size="xl">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création d'un encaissement</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <form ref="form">
          <v-app>
            <v-row class="p-2">
              <v-col cols="3">
                <v-container>
                  <v-autocomplete
                    v-model="encaissement.caissier_id"
                    :items="caissiers"
                    item-text="user"
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
                  <v-autocomplete
                    v-model="encaissement.bordereau_id"
                    :items="bordereaux"
                    item-text="code"
                    item-value="id"
                    outlined
                    dense
                    :disabled="disabled"
                  >
                    <template #label>
                      Code du bordereau
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
                <InfosBordereau v-if="encaissement.bordereau_id" :id="encaissement.bordereau_id" />
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
                <BordereauForm v-if="encaissement.bordereau_id" v-model="encaissement" @setForm="onSetForm" />
              </v-col>
            </v-row>
          </v-app>
        </form>
      </b-overlay>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" :disabled="!validable || submiting" class="btn btn-primary" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InfosContrat from './InfosContrat.vue'
import InfosBordereau from './InfosBordereau.vue'
import BordereauForm from './BordereauForm.vue'
import CashForm from './CashForm.vue'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { InfosContrat, InfosBordereau, CashForm, BordereauForm },
  props: { value: Boolean },
  data: () => ({
    submiting: false,
    menu: null,
    disabled: true,
    ordonnancement: {},
    encaissement: {
      caissier_id: null,
      ordonnancement_id: null,
      bordereau_id: null,
    },
    validable: false,
    key: true,
    mode: 1,
    errors: {},
  }),
  async fetch() {
    await this.getCaissiers()
    await this.getOrdonnancements()
    await this.getBordereaux()
  },
  computed: {
    ...mapGetters({
      ordonnancements: MODULES.ORDONNANCEMENT.GETTERS.ORDONNANCEMENTS,
      bordereaux: MODULES.BORDEREAU.GETTERS.BORDEREAUX,
      caissiers: MODULES.CAISSIER.GETTERS.CAISSIERS,
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
  methods: {
    ...mapActions({
      ajouter: MODULES.ENCAISSEMENT.ACTIONS.ADD,
      getCaissiers: MODULES.CAISSIER.ACTIONS.ALL,
      getOrdonnancements: MODULES.ORDONNANCEMENT.ACTIONS.UNPAIDS,
      getBordereaux: MODULES.BORDEREAU.ACTIONS.CASHOUT,
      getOne: MODULES.ORDONNANCEMENT.ACTIONS.ONE,
      ouvertureExists: MODULES.OUVERTURE.ACTIONS.EXISTS,
    }),
    save() {
      this.submiting = true
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
        .finally(() => (this.submiting = false))
    },
    reset() {
      this.disabled = true
      this.ordonnancement = {}
      this.encaissement = {}
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
                title: 'ATTENTION',
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
    onSetForm(data) {
      this.validable = true
      this.encaissement = { ...this.encaissement, ...data }
    },
  },
}
</script>
