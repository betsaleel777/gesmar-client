<template>
  <b-card aria-hidden="true" header="Liste des Encaissements de Bordereaux">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <div class="">
          <feather
            v-b-tooltip.hover.top
            v-can="permissions.create"
            title="créer"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="plus"
            @click="dialog = true"
          />
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
        placeholder="Rechercher"
        class="mg-y-10"
        :debounce="500"
      ></b-form-input>
      <b-table
        ref="table"
        class="table"
        hover
        small
        bordered
        primary-key="id"
        :items="attributions.data"
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
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #cell(jour)="data">
          {{ $moment(data.item.jour).format('DD-MM-YYYY') }}
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
    <CreateCollecteModal v-if="dialog" v-model="dialog" />
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateCollecteModal from './CreateCollecteModal.vue'
import { ATTRIBUTION } from '~/helper/constantes'
import { finance } from '~/helper/permissions'
const permissions = finance.bordereaux.collecte
export default {
  components: { CreateCollecteModal },
  data: () => ({
    dialog: false,
    search: null,
    fields: [
      'ordre',
      { key: 'bordereau', label: 'Numéro du bordereau', sortable: false },
      { key: 'emplacement', label: "Code d'emplacement", sortable: false },
      { key: 'commercial', label: 'Nom Du commercial', sortable: false },
      { key: 'jour', label: 'Date', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'status',
        label: 'Statuts',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
    ],
    filter: null,
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
    ...mapGetters('finance/attribution', ['attributions']),
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
    ...mapActions({
      getPaginate: 'finance/attribution/getPaginate',
      getSearch: 'finance/attribution/getSearch',
    }),
    imprimer() {},
    statusClass(value) {
      const classes = {
        [ATTRIBUTION.cashed]: 'badge badge-success-light',
        [ATTRIBUTION.uncashed]: 'badge badge-danger-light',
      }
      return classes[value]
    },
    pageInit() {
      this.pages = this.attributions.meta.last_page
      this.currentPage = this.attributions.meta.current_page
    },
    getPage(page) {
      if (this.search) {
        this.rechercher(page)
      } else {
        this.fetchPaginateListe()
      }
    },
    rechercher(page = 1) {
      this.loading = true
      this.getSearch({ search: this.search, page }).then(() => {
        this.pageInit()
        this.loading = false
      })
    },
    async fetchPaginateListe() {
      this.loading = true
      await this.getPaginate()
      this.pageInit()
      this.loading = false
    },
  },
}
</script>
<style></style>
