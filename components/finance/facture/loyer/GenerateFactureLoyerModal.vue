<template>
  <b-modal v-model="dialog" no-close-on-backdrop scrollable size="lg">
    <template #modal-header>
      <h5 class="modal-title text-primary">Génerer les factures de loyer</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true">
          <feather type="x" />
        </span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="submiting" spinner-variant="primary" rounded="sm">
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
                  <v-text-field v-model="mois" label="Sélection du mois" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
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
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details></v-text-field>
                </template>
              </v-data-table>
            </v-form>
          </v-container>
        </v-app>
      </b-overlay>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">Générer</button>
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
    emplacements: [],
    selected: [],
    loading: false,
    mois: '',
    headers: [
      { text: 'Emplacement', align: 'start', sortable: false, value: 'code' },
      { text: 'Clients', value: 'client' },
      { text: 'Loyer (FCFA)', value: 'loyer', align: 'right', sortable: false },
    ],
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
  },
  methods: {
    ...mapActions({ getMonthRental: MODULES.EMPLACEMENT.ACTIONS.MONTH_RENTAL, ajouter: MODULES.FACTURE.LOYER.ACTIONS.ADD }),
    save() {
      if (this.selected.length > 0) {
        this.submiting = true
        const factures = this.selected.map((emplacement) => {
          const { contrat_id: id, loyer } = emplacement
          return { contrat_id: id, periode: this.mois + '-01', montant_loyer: loyer }
        })
        this.ajouter(factures)
          .then(({ message }) => {
            this.submiting = false
            this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
            this.dialog = false
          })
          .finally(() => (this.submiting = false))
      } else {
        this.$notify({
          text: "Aucun client n'a été sélectionné",
          title: "echec de l'opération",
          type: 'error',
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
