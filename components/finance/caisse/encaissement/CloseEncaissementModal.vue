<template>
  <b-modal v-model="dialog">
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
import { caissePointPrinter, errorHandling } from '~/helper/helpers'
import { ENCAISSEMENT } from '~/helper/constantes'
import modal from '~/mixins/modal'
import { MODULES } from '~/helper/modules-types'
export default {
  mixins: [modal],
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
    ...mapGetters({
      societe: MODULES.APPLICATION.GETTERS.SOCIETE,
      caissiers: MODULES.CAISSIER.GETTERS.CAISSIERS,
    }),
  },
  methods: {
    ...mapActions({
      getOne: MODULES.OUVERTURE.ACTIONS.BY_CAISSIER,
      getCaissiers: MODULES.CAISSIER.ACTIONS.ALL,
      ajouter: MODULES.FERMETURE.ACTIONS.ADD,
      getSociete: MODULES.APPLICATION.ACTIONS.ONE,
    }),
    save() {
      this.ajouter(this.fermeture)
        .then(({ message, fermeture }) => {
          this.getSociete().then(() => {
            this.printer(fermeture)
            this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
            this.dialog = false
          })
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
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
            this.$notify({ text: message, title: 'attention!!', type: 'warning' })
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
