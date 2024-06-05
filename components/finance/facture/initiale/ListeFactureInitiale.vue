<template>
  <b-card aria-hidden="true" header="Liste des factures initiales">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse"></div>
      <hr class="mg-t-4" />
      <b-form-input id="filter-input" v-model="search" type="search"
        placeholder="Rechercher selon code, contrat, personne, emplacement" class="mg-y-10"
        :debounce="500"></b-form-input>
      <b-table id="table" class="table" hover small bordered primary-key="id" :items="factures.data" :fields="fields"
        responsive empty-text="Aucune facture" show-empty :busy="$fetchState.pending || loading" no-provider-filtering>
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
        <template #cell(pas_porte)="data">
          {{ data.item.pas_porte | currency }}
        </template>
        <template #cell(option)="data">
          <a v-can="permissions.show" type="button" @click="details(data.item)">
            <feather title="visualiser" type="eye" size="20" stroke="indigo" />
          </a>
          <a v-if="!data.item.unmodifiable" v-can="permissions.edit" type="button" @click="editer(data.item)">
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </a>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">
            {{ scope.emptyText }}
          </h6>
        </template>
      </b-table>
      <b-pagination-nav v-model="currentPage" :number-of-pages="pages" align="right" base-url="#" size="sm"
        @change="getPage"></b-pagination-nav>
    </b-card-text>
    <ShowFactureInitialeModal v-if="show.modal" :id="show.id" v-model="show.modal" />
    <EditFactureInitialeModal v-if="edit.modal" :id="edit.facture" v-model="edit.modal" />
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowFactureInitialeModal from './ShowFactureInitialeModal.vue'
import EditFactureInitialeModal from './EditFactureInitialeModal.vue'
import { FACTURE } from '~/helper/constantes'
import { factureInitiale } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { EditFactureInitialeModal, ShowFactureInitialeModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat', label: 'Contrat', sortable: true },
      { key: 'personne', label: 'Personne', sortable: true },
      {
        key: 'emplacement',
        label: 'Emplacement',
        thClass: 'text-center',
        tdClass: 'text-center',
        sortable: true,
      },
      {
        key: 'avance',
        label: 'Avance',
        formatter: (value) => {
          return new Intl.NumberFormat('pt-GW').format(Number(value)) + ' FCFA'
        },
        thClass: 'text-right',
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'caution',
        label: 'Caution',
        formatter: (value) => {
          return new Intl.NumberFormat('pt-GW').format(Number(value)) + ' FCFA'
        },
        thClass: 'text-right',
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'pas_porte',
        label: 'Pas de porte',
        thClass: 'text-right',
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
        thClass: 'wd-5p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, facture: 0 },
    show: { modal: false, id: 0 },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    permissions: factureInitiale,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ factures: MODULES.FACTURE.INITIALE.GETTERS.FACTURES }),
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
    ...mapActions({ getPaginate: MODULES.FACTURE.INITIALE.ACTIONS.PAGINATE, getSearch: MODULES.FACTURE.INITIALE.ACTIONS.SEARCH }),
    editer({ id }) {
      this.edit.facture = id
      this.edit.modal = true
    },
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
    details({ id }) {
      this.show.id = id
      this.show.modal = true
    },
  },
}
</script>
<style></style>
