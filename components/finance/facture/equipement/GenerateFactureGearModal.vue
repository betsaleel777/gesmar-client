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
            <v-col cols="12" md="6" sm="6">
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
            <v-col cols="12" md="6" sm="6">
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
          <v-row class="mt-0">
            <v-col cols="12" md="9">
              <v-data-table :headers="headers" :search="search" :items="factures" :items-per-page="5" :loading="loading" dense locale="fr">
                <template #top>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher ..." class="my-0"></v-text-field>
                </template>
                <template #[`item.montant`]="{ item }"> {{ item.montant | currency }} </template>
                <template #[`item.index_fin`]="{ item, index }">
                  <v-text-field v-model.number="item.index_fin" dense @change="draft(index)"></v-text-field>
                </template>
                <div class="text-center pt-2"></div>
              </v-data-table>
            </v-col>
            <v-divider vertical class="my-5"></v-divider>
            <v-col cols="12" md="3">
              <v-container>
                <v-list two-line subheader>
                  <v-subheader inset>Aperçu</v-subheader>
                  <v-list-item v-for="(apercu, index) in apercus" :key="index">
                    <v-list-item-content>
                      <v-list-item-title
                        ><b>{{ apercu.compteur }}</b></v-list-item-title
                      >
                      <v-list-item-subtitle
                        >l'index relevé est <b>{{ apercu.index_fin }}</b></v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon v-if="apercu.error" color="error">mdi-cancel</v-icon>
                        <v-icon v-else color="success">mdi-check</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-container>
            </v-col>
          </v-row>
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
    apercus: [],
    loading: false,
    mois: '',
    date_limite: '',
    headers: [
      { text: 'Emplacement', align: 'start', value: 'code', sortable: false },
      { text: 'Client', align: 'start', value: 'client' },
      { text: 'Equipement', align: 'start', value: 'compteur', sortable: false },
      { text: 'Départ', align: 'start', value: 'index_depart' },
      { text: 'Fin', align: 'start', value: 'index_fin', width: '10%', sortable: false },
      { text: 'Montant', align: 'end', value: 'montant' },
    ],
  }),
  computed: {
    errorFind() {
      return this.apercus.length > 0 ? this.apercus.some(({ prix_unitaire, index_fin, index_depart }) => prix_unitaire * (index_fin - index_depart) < 0) : true
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
                index_fin: null,
                code,
                periode: this.mois + '-01',
                prix_unitaire,
                prix_fixe,
                frais_facture,
                montant: 0,
                error: false,
              }
            }
          )
          this.loading = false
        })
      }
    },
    save() {
      this.submiting = true
      const factures = this.apercus.map(({ id, code, client, ...factures }) => factures)
      this.ajouter({ date_limite: this.date_limite, factures })
        .then(({ message }) => {
          this.$notify({ text: message, title: 'succès de la création'.toLocaleUpperCase(), type: 'success' })
          this.dialog = false
        })
        .finally(() => (this.submiting = false))
    },
    draft(index) {
      const facture = this.factures[index]
      const exists = this.apercus.some((elt) => elt.id === facture.id)
      const coutEnergie = facture.prix_unitaire * (facture.index_fin - facture.index_depart)
      facture.montant = coutEnergie + facture.frais_facture + facture.prix_fixe
      facture.error = coutEnergie < 0
      if (!isNaN(parseInt(facture.index_fin)) && !exists) {
        this.apercus.push(facture)
      } else if (exists) {
        this.apercus.splice(index, 1, facture)
      } else this.apercus.splice(index, 1)
    },
  },
}
</script>
