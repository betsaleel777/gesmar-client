<template>
  <b-card aria-hidden="true" header="Liste des factures annexes">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <div class="">
          <feather
            v-b-tooltip.hover.top
            title="imprimer liste"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="printer"
          />
        </div>
      </div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon code, contrat, personne, annexe"
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
        :busy="$fetchState.pending || loading"
        show-empty
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Chargement...</strong>
          </div>
        </template>
        <template #cell(ordre)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(status)="data">
          <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">
            {{ scope.emptyText }}
          </h6>
        </template>
      </b-table>
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="pages"
        align="right"
        base-url="#"
        size="sm"
        @change="getPage"
      ></b-pagination-nav>
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { FACTURE } from '~/helper/constantes'
export default {
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat_code', label: 'Contrat', sortable: true },
      { key: 'personne', label: 'Personne', sortable: true },
      {
        key: 'annexe',
        label: 'Service',
        tdClass: 'text-center',
        sortable: true,
      },
      {
        key: 'prix',
        label: 'Prix',
        formatter: (value) => {
          return Number(value)
        },
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'status',
        label: 'Statut',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, facture: {} },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ factures: 'facture/annexe/factures' }),
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
    ...mapActions({ getPaginate: 'facture/annexe/getPaginate', getSearch: 'facture/annexe/getSearch' }),
    imprimer() {},
    statusClass(value) {
      const classes = {
        [FACTURE.status.facture]: 'badge badge-warning-light',
        [FACTURE.status.paid]: 'badge badge-success-light',
        [FACTURE.status.unpaid]: 'badge badge-danger-light',
        [FACTURE.status.proforma]: 'badge badge-primary-light',
      }
      return classes[value]
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
      this.loading = true
      this.getSearch({ search: this.search, page }).then(() => {
        this.pageInit()
        this.loading = false
      })
    },
    async fetchPaginateListe(page) {
      this.loading = true
      await this.getPaginate(page)
      this.pageInit()
      this.loading = false
    },
  },
}
</script>
<style></style>
