<template>
  <b-card aria-hidden="true" header="Liste des factures soldées">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse"></div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon le code, le code du contrat, nom complet du client, code de l'emplacement"
        class="mg-y-10"
        :debounce="500"
      ></b-form-input>
      <b-table
        id="table"
        class="table"
        hover
        small
        bordered
        primary-key="id"
        :items="factures.data"
        :fields="fields"
        responsive
        empty-text="Aucune facture"
        :busy="$fetchState.pending || searchLoading"
        show-empty
        no-provider-filtering
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Chargement...</strong>
          </div>
        </template>
        <template #cell(ordre)="data">{{ data.index + 1 }}</template>
        <template #cell(option)="data">
          <a type="button" @click="details(data.item)">
            <feather title="détails" type="eye" size="20" stroke="indigo" />
          </a>
        </template>
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #cell(produit)="data">
          <span v-if="data.item.contrat.emplacement">{{ data.item.contrat.emplacement.code }}</span>
          <span v-else>{{ data.item.contrat.annexe.nom }}</span>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">{{ scope.emptyText }}</h6>
        </template>
      </b-table>
      <b-pagination-nav v-model="currentPage" :number-of-pages="pages" align="right" base-url="#" size="sm" @change="getPage"></b-pagination-nav>
    </b-card-text>
    <ShowFactureAnnexeModal v-if="show.annexe.modal" :id="show.annexe.id" v-model="show.annexe.modal" />
    <ShowFactureGearModal v-if="show.equipement.modal" :id="show.equipement.id" v-model="show.equipement.modal" />
    <ShowFactureInitialeModal v-if="show.initiale.modal" :id="show.initiale.id" v-model="show.initiale.modal" />
    <ShowFactureLoyerModal v-if="show.loyer.modal" :id="show.loyer.id" v-model="show.loyer.modal" />
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowFactureAnnexeModal from './annexe/ShowFactureAnnexeModal.vue'
import ShowFactureInitialeModal from './initiale/ShowFactureInitialeModal.vue'
import ShowFactureGearModal from './equipement/ShowFactureGearModal.vue'
import ShowFactureLoyerModal from './loyer/ShowFactureLoyerModal.vue'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { ShowFactureAnnexeModal, ShowFactureGearModal, ShowFactureInitialeModal, ShowFactureLoyerModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat.code', label: 'Contrat', sortable: true },
      { key: 'contrat.personne.fullname', label: 'Personne', sortable: true },
      { key: 'produit', label: 'Produit', tdClass: 'text-center', thClass: 'text-center', sortable: true },
      { key: 'created_at', label: 'Date', tdClass: 'text-center', thClass: 'text-center' },
      { key: 'option', label: 'Options', tdClass: 'text-center', thClass: 'wd-5p text-center', sortable: false },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    show: {
      loyer: { modal: false, id: 0 },
      initiale: { modal: false, id: 0 },
      annexe: { modal: false, id: 0 },
      equipement: { modal: false, id: 0 },
    },
    search: null,
    pages: 1,
    currentPage: 1,
    searchLoading: false,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ factures: MODULES.FACTURE.GETTERS.FACTURES }),
  },
  watch: {
    search(recent) {
      if (recent) {
        this.rechercher()
      } else {
        this.fetchPaginateListe()
      }
    },
  },
  methods: {
    ...mapActions({ getPaginate: MODULES.FACTURE.ACTIONS.PAID_PAGINATE, getSearch: MODULES.FACTURE.ACTIONS.PAID_SEARCH }),
    details({ type, id }) {
      this.show[type].id = id
      this.show[type].modal = true
    },
    pageInit() {
      this.pages = this.factures.meta.last_page
      this.currentPage = this.factures.meta.current_page
    },
    getPage(page) {
      if (this.search) {
        this.rechercher(page)
      } else {
        this.fetchPaginateListe(page)
      }
    },
    rechercher(page = 1) {
      this.searchLoading = true
      this.getSearch({ search: this.search, page }).then(() => {
        this.pageInit()
        this.searchLoading = false
      })
    },
    async fetchPaginateListe(page) {
      this.searchLoading = true
      await this.getPaginate(page)
      this.pageInit()
      this.searchLoading = false
    },
  },
}
</script>
<style></style>
