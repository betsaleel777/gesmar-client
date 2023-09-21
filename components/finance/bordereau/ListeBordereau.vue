<template>
  <b-card aria-hidden="true" header="Liste des bordereaux">
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
        placeholder="Rechercher selon code, commercial et date"
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
        :items="bordereaux.data"
        :fields="fields"
        responsive
        empty-text="Tableau vide"
        show-empty
        :busy="$fetchState.pending || loading"
        no-provider-filtering
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
        <template #cell(etat)="data">
          <span :class="stateClass(data.item.etat)">{{ data.item.etat }}</span>
        </template>
        <template #cell(option)="data">
          <a v-can="permissions.show" type="button" @click="details(data.item)">
            <feather title="visualiser" type="eye" size="20" stroke="indigo" />
          </a>
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
      <ShowBordereauModal v-if="show.modal" v-model="show.modal" :bordereau="show.bordereau" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowBordereauModal from './ShowBordereauModal.vue'
import { ATTRIBUTION, COLLECTE } from '~/helper/constantes'
import { finance } from '~/helper/permissions'
const permissions = finance.bordereaux.bordereau
export default {
  components: {
    ShowBordereauModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code du bordereau', sortable: false },
      { key: 'commercial', label: 'Nom Du commercial', sortable: true },
      { key: 'date_attribution', label: 'Date', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      { key: 'etat', label: 'Etat', tdClass: 'text-center', thClass: 'text-center' },
      { key: 'status', label: 'Statuts', tdClass: 'text-center', thClass: 'text-center' },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    show: { modal: false, bordereau: {} },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    permissions,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters('finance/bordereau', ['bordereaux']),
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
    ...mapActions({ getPaginate: 'finance/bordereau/getPaginate', getSearch: 'finance/bordereau/getSearch' }),
    imprimer() {},
    details({ id, code }) {
      this.show.bordereau = { id, code }
      this.show.modal = true
    },
    statusClass(value) {
      const classes = {
        [ATTRIBUTION.cashed]: 'badge badge-success-light',
        [ATTRIBUTION.uncashed]: 'badge badge-danger-light',
      }
      return classes[value]
    },
    stateClass(value) {
      const classes = {
        [COLLECTE.collected]: 'badge badge-success-light',
        [COLLECTE.uncollected]: 'badge badge-danger-light',
      }
      return classes[value]
    },
    pageInit() {
      this.pages = this.bordereaux.meta.last_page
      this.currentPage = this.bordereaux.meta.current_page
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
