<template>
  <b-modal id="modalGenererLoyer" no-close-on-backdrop size="lg" @show="reset">
    <template #modal-header>
      <h5 class="modal-title text-primary">Génerer les factures de loyer</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <div>
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
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="mois" locale="fr" type="month" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                  <v-btn text color="primary" @click="getEmplacements(mois + '-01')"> OK </v-btn>
                </v-date-picker>
              </v-menu>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="emplacements"
                item-key="code"
                show-select
                class="elevation-0"
                :loading="loading"
                loading-text="En chargement..."
                :search="search"
              >
                <template #top>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Rechercher"
                    single-line
                    hide-details
                  ></v-text-field>
                </template>
              </v-data-table>
            </v-form>
          </v-container>
        </v-app>
      </div>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" class="btn btn-primary text-white" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  data: () => ({
    menu: false,
    search: null,
    emplacements: [],
    selected: [],
    loading: false,
    mois: '',
    headers: [
      {
        text: 'Code',
        align: 'start',
        sortable: false,
        value: 'code',
      },
      { text: 'Clients', value: 'contrat_actuel.personne.alias' },
      { text: 'Loyer (FCFA)', value: 'loyer', align: 'right' },
    ],
  }),
  methods: {
    ...mapActions({
      getMonthRental: 'architecture/emplacement/getMonthRental',
      ajouter: 'facture/loyer/ajouter',
    }),
    reset() {
      this.emplacements = []
      this.selected = []
      this.mois = ''
      this.loading = false
      this.$bvModal.hide('modalGenererLoyer')
    },
    save() {
      if (this.selected.length > 0) {
        const factures = this.selected.map((emplacement) => {
          const {
            contrat_actuel: { id },
          } = emplacement
          return { contrat_id: id, periode: this.mois + '-01' }
        })
        this.ajouter(factures).then(({ message }) => {
          this.$bvModal.hide('modalGenererLoyer')
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
        })
      } else {
        this.$bvToast.toast("Aucun client n'a été sélectionné", {
          title: 'echec opération'.toLocaleUpperCase(),
          variant: 'danger',
          solid: true,
        })
      }
    },
    getEmplacements(date) {
      if (date) {
        this.$refs.menu.save(this.mois)
        this.loading = true
        this.getMonthRental(date).then(({ emplacements }) => {
          this.emplacements = emplacements
          this.loading = false
        })
      }
    },
  },
}
</script>
<style></style>
