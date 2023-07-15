<template>
  <b-modal v-model="dialog" @show="reset">
    <template #modal-header>
      <h5 class="modal-title text-primary">Fermeture de caisse</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <v-autocomplete
          v-model="fermeture.caissier_id"
          :items="caissiers"
          item-text="user"
          item-value="id"
          outlined
          dense
          :error="errors.caissier_id.exist"
          :error-messages="errors.caissier_id.message"
          @change="setOuverture"
        >
          <template #label>
            Caissier
            <span class="red--text"><strong>* </strong></span></template
          >
        </v-autocomplete>
        <v-row>
          <v-col>
            <v-text-field v-model="guichet" readonly outlined dense label="guichet"></v-text-field>
          </v-col>
          <v-col
            ><v-text-field
              v-model="fermeture.total"
              outlined
              dense
              :error="errors.total.exist"
              :error-messages="errors.total.message"
            >
              <template #label>
                Montant total
                <span class="red--text"><strong>* </strong></span></template
              >
            </v-text-field>
          </v-col>
        </v-row>
      </v-app>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning text-white" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import { caissePointPrinter } from '~/helper/helpers'
import { ENCAISSEMENT } from '~/helper/constantes'
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    guichet: null,
    fermeture: {
      caissier_id: null,
      total_normal: null,
      ouverture_id: null,
      total: null,
    },
    errors: {
      caissier_id: { exist: false, message: null },
      total: { exist: false, message: null },
    },
  }),
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    ...mapGetters({
      societe: 'architecture/application/societe',
      caissiers: 'caisse/caissier/caissiers',
    }),
  },
  methods: {
    ...mapActions({
      getOne: 'caisse/ouverture/getByCaissier',
      getCaissiers: 'caisse/caissier/getAll',
      ajouter: 'caisse/fermeture/ajouter',
      getSociete: 'architecture/application/getOne',
    }),
    reset() {
      this.fermeture = {
        caissier_id: null,
        ouverture_id: null,
        total_normal: null,
        total: null,
      }
      this.guichet = null
      this.errors = {
        caissier_id: { exist: false, message: null },
        total: { exist: false, message: null },
      }
    },
    save() {
      this.ajouter(this.fermeture)
        .then(({ message, fermeture }) => {
          this.getSociete().then(() => {
            this.printer(fermeture)
            this.$bvToast.toast(message, {
              title: 'succès de la création'.toLocaleUpperCase(),
              variant: 'success',
              solid: true,
            })
            this.dialog = false
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
    setOuverture() {
      if (this.fermeture.caissier_id) {
        this.getOne(this.fermeture.caissier_id).then(({ ouverture, message }) => {
          if (ouverture) {
            this.guichet = ouverture.guichet.nom
            this.fermeture.total = ouverture.total
            this.fermeture.ouverture_id = ouverture.id
            this.fermeture.total_normal = ouverture.total
          } else if (message) {
            this.$bvToast.toast(message, {
              title: 'ATTENTION',
              variant: 'warning',
              solid: true,
            })
          }
        })
      }
    },
    printer(fermeture) {
      const totalCheque = () => {
        let total = 0
        fermeture.encaissements.forEach((encaissement) => {
          if (encaissement.type === ENCAISSEMENT.type.cheque) total += encaissement.payable.valeur
        })
        return total
      }
      const totalEspece = () => {
        let total = 0
        fermeture.encaissements.forEach((encaissement) => {
          if (encaissement.type === ENCAISSEMENT.type.espece) total += encaissement.payable.montant
        })
        return total
      }
      const infos = {
        ...fermeture,
        totalCheque: totalCheque(),
        totalEspece: totalEspece(),
        totalTransaction: totalCheque() + totalEspece(),
        total: totalCheque() + totalEspece() + fermeture.initial,
      }
      caissePointPrinter(this.societe, infos)
    },
  },
}
</script>

<style></style>
