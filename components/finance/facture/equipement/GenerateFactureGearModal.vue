<template>
  <b-modal v-model="dialog" scrollable size="xl">
    <template #modal-header>
      <h5 class="modal-title text-primary">Générer les factures des équipements</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true">
          <feather type="x" />
        </span>
      </button>
    </template>
    <v-app>
      <v-container fluid>
        <v-form>
          <v-row>
            <v-col col="6">
              <v-menu
                ref="menuMonth"
                v-model="menuMonth"
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
                  <v-btn text color="primary" @click="menuMonth = false"> Annuler </v-btn>
                  <v-btn text color="primary" @click="getAbonnements(mois + '-01')"> OK </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col col="6">
              <v-menu
                ref="menuDateLimite"
                v-model="menuDateLimite"
                :close-on-content-click="false"
                :return-value.sync="date_limite"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
                class="mb-5"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="date_limite"
                    label="Sélection de la date limite"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_limite"
                  locale="fr"
                  :min="min"
                  :max="max"
                  type="date"
                  :show-current="currentDate"
                  :show-adjacent-months="false"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDateLimite = false"> Annuler </v-btn>
                  <v-btn text color="primary" @click="$refs.menuDateLimite.save(date_limite)"> OK </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <div v-if="loading" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <v-data-table :headers="headers" :search="search" :items="factures" dense>
            <template #top>
              <v-text-field v-model="search" label="Rechercher ..." class="my-0"></v-text-field>
            </template>
            <template #montant="{ item }"> {{ item.montant | currency }} </template>
            <template #[`item.index_fin`]="props">
              <v-edit-dialog
                :return-value.sync="props.item.index_fin"
                @save="saveDialog(props.item)"
                @cancel="cancelDialog(props.item)"
                @close="closeDialog(props.item)"
                @open="openDialog(props.item)"
              >
                {{ props.item.index_fin }}
                <template #input>
                  <v-text-field v-model="props.item.index_fin" label="Index relévé" single-line counter autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
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
    menuMonth: false,
    menuDateLimite: false,
    search: null,
    factures: [],
    loading: false,
    mois: '',
    date_limite: '',
    errors: [],
    dialogRule: (item) => item.index_fin >= item.index_depart || 'index incorrect',
    headers: [
      { text: 'Emplacement', align: 'start', value: 'code', sortable: false },
      { text: 'Client', align: 'start', value: 'client' },
      { text: 'Equipement', align: 'start', value: 'compteur', sortable: false },
      { text: 'Départ', align: 'start', value: 'index_depart' },
      { text: 'Fin', align: 'start', value: 'index_fin', sortable: false },
      { text: 'Montant', align: 'start', value: 'montant' },
    ],
  }),
  computed: {
    errorFind() {
      return true
    },
    currentDate() {
      return this.$moment(this.mois + '-01')
        .add(1, 'M')
        .format('YYYY-MM-DD')
    },
    min() {
      return this.mois ? this.$moment(this.currentDate).startOf('month').format('YYYY-MM-DD') : undefined
    },
    max() {
      return this.mois ? this.$moment(this.currentDate).endOf('month').format('YYYY-MM-DD') : undefined
    },
  },
  methods: {
    ...mapActions({
      getMonthRental: MODULES.ABONNEMENT.ACTIONS.MOUNTH_RENTAL_GEAR,
      ajouter: MODULES.FACTURE.EQUIPEMENT.ACTIONS.ADD,
    }),
    getAbonnements(date) {
      if (date) {
        this.loading = true
        this.$refs.menuMonth.save(this.mois)
        this.getMonthRental(date).then(({ abonnements }) => {
          this.factures = abonnements.map(
            ({ id, emplacement, equipement: { id: equipement_id, code: compteur, prix_unitaire, prix_fixe, frais_facture }, index_depart: depart }) => {
              const { contrat, code } = emplacement
              return {
                id,
                contrat_id: contrat.id,
                equipement_id,
                compteur,
                client: contrat.personne.alias,
                index_depart: contrat.facturesEquipements.length > 0 ? contrat.facturesEquipements[0].index_fin : depart,
                index_fin: 0,
                code,
                periode: this.mois + '-01',
                prix_unitaire,
                prix_fixe,
                frais_facture,
                montant: 0,
                contrat,
              }
            }
          )
          this.loading = false
        })
      }
    },
    // calculMontant(index) {
    //   const facture = this.factures[index]
    //   const { index_depart: depart, prix, contrat } = facture
    //   const factures = contrat.facturesEquipements
    //   const indexCourant = factures.length > 0 ? factures[0].index_fin : depart
    //   if (facture.index_fin >= indexCourant) {
    //     facture.montant = prix * Math.abs(facture.index_fin - indexCourant)
    //   } else {
    //     facture.exist = true
    //     facture.message = "Valeur incorrecte de l'index"
    //   }
    // },
    save() {
      this.submiting = true
      this.ajouter(this.factures)
        .then(({ message }) => {
          this.$notify({ text: message, title: 'succès de la création'.toLocaleUpperCase(), type: 'success' })
          this.dialog = false
        })
        .finally(() => (this.submiting = false))
    },
    cancelDialog(props) {},
    closeDialog(props) {},
    saveDialog(props) {},
    openDialog(props) {},
  },
}
</script>
<style></style>
