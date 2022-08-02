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
              <v-date-picker
                v-model="mois"
                locale="fr"
                landscape
                type="month"
                full-width
                class="mb-5"
                @change="getEmplacements(mois + '-01')"
              ></v-date-picker>
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
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="reset"
      >
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  data: () => ({
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
      { text: 'Clients', value: 'nomComplet' },
      { text: 'Loyer (FCFA)', value: 'loyer', align: 'right' },
    ],
  }),
  methods: {
    ...mapActions({
      getMonthRental: 'architecture/emplacement/getMonthRental',
    }),
    reset() {
      this.emplacements = []
      this.selected = []
      this.mois = ''
      this.$bvModal.hide('modalGenererLoyer')
    },
    save() {},
    getEmplacements(date) {
      if (date) {
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
