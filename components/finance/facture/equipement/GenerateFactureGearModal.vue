<template>
  <b-modal v-model="dialog" scrollable size="xl">
    <template #modal-header>
      <h5 class="modal-title text-primary">Générer les factures des équipements</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <v-app>
      <v-container fluid>
        <v-form>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="mois"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
            class="mb-5"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="mois"
                label="Sélection du mois"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="mois" locale="fr" type="month" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Annuler </v-btn>
              <v-btn text color="primary" @click="getAbonnements(mois + '-01')"> OK </v-btn>
            </v-date-picker>
          </v-menu>
          <div v-if="loading" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <v-simple-table v-else dense>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left" style="width: 1%">N</th>
                  <th class="text-left">Client</th>
                  <th class="text-left">Emplacement</th>
                  <th class="text-left">Equipement</th>
                  <th class="text-left">Index Départ</th>
                  <th class="text-left" style="width: 20%">Index Fin</th>
                  <th class="text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(facture, index) in factures" :key="index">
                  <td>
                    <b>{{ index + 1 }}</b>
                  </td>
                  <td>{{ facture.client }}</td>
                  <td>{{ facture.code }}</td>
                  <td>{{ facture.compteur }}</td>
                  <td>
                    <span v-if="facture.contrat.facturesEquipements.length > 0">{{ facture.contrat.facturesEquipements[0].index_fin }}</span>
                    <span v-else>{{ facture.index_depart }}</span>
                  </td>
                  <td>
                    <v-text-field
                      v-model.number="facture.index_fin"
                      dense
                      :error="facture.exist"
                      :error-messages="facture.message"
                      @keyup="calculMontant(index)"
                    ></v-text-field>
                  </td>
                  <td class="text-right">{{ facture.montant | currency }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- <pre>{{ factures }}</pre> -->
        </v-form>
      </v-container>
    </v-app>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">Fermer</button>
      <button :disabled="errorFind || submiting" type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'

export default {
  mixins: [modal],
  data: () => ({
    submiting: false,
    menu: false,
    search: null,
    factures: [],
    loading: false,
    mois: '',
    errors: [],
  }),
  computed: {
    errorFind() {
      return this.factures.some(({ exist }) => exist) || this.factures.length === 0
    },
  },
  methods: {
    ...mapActions({
      getMonthRental: MODULES.ABONNEMENT.ACTIONS.MOUNTH_RENTAL_GEAR,
      ajouter: MODULES.FACTURE.EQUIPEMENT.ACTIONS.ADD,
    }),
    getAbonnements(date) {
      if (date) {
        this.$refs.menu.save(this.mois)
        this.loading = true
        this.getMonthRental(date).then(({ abonnements }) => {
          this.factures = abonnements.map(({ emplacement, equipement: { id, nom, prix_fixe: prix }, index_depart: depart }) => {
            const { contrat, code } = emplacement
            return {
              contrat_id: contrat.id,
              equipement_id: id,
              compteur: nom,
              client: contrat.personne.alias,
              index_depart: contrat.facturesEquipements.length > 0 ? contrat.facturesEquipements[0].index_fin : depart,
              index_fin: null,
              code,
              periode: this.mois + '-01',
              prix,
              montant: 0,
              exist: false,
              message: null,
              contrat,
            }
          })
          this.loading = false
        })
      }
    },
    calculMontant(index) {
      const facture = this.factures[index]
      facture.exist = false
      facture.message = null
      const { index_depart: depart, prix, contrat } = facture
      const factures = contrat.facturesEquipements
      const indexCourant = factures.length > 0 ? factures[0].index_fin : depart
      if (facture.index_fin > indexCourant) {
        facture.montant = prix * Math.abs(facture.index_fin - indexCourant)
      } else {
        facture.exist = true
        facture.message = "Valeur incorrecte de l'index"
      }
    },
    save() {
      this.submiting = true
      this.ajouter(this.factures)
        .then(({ message }) => {
          this.$notify({ text: message, title: 'succès de la création'.toLocaleUpperCase(), type: 'success' })
          this.dialog = false
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style></style>
