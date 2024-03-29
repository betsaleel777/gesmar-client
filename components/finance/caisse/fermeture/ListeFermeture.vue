<template>
  <b-card aria-hidden="true" header="Point de caisse">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse"></div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon caissier, guichet, date"
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
        :items="fermetures.data"
        :fields="fields"
        responsive
        empty-text="Liste vide"
        :busy="$fetchState.pending || loading"
        show-empty
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
        <template #cell(option)="data">
          <a type="button" @click="detail(data.item)">
            <feather title="eye" type="eye" size="20" stroke="indigo" />
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
      <ShowFermeture v-if="show.modal" :id="show.id" v-model="show.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowFermeture from './ShowFermeture.vue'
export default {
  components: { ShowFermeture },
  data: () => ({
    fields: [
      'ordre',
      { key: 'caissier.user.name', label: 'Caissier' },
      { key: 'guichet.nom', label: 'Guichet' },
      { key: 'total', label: 'Total encaissé' },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    show: { modal: false, id: null },
    close: false,
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
    ...mapGetters({ fermetures: 'caisse/fermeture/fermetures' }),
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
    ...mapActions({ getPaginate: 'caisse/fermeture/getPaginate', getSearch: 'caisse/fermeture/getSearch' }),
    detail({ id }) {
      this.show.modal = true
      this.show.id = Number(id)
    },
    pageInit() {
      this.pages = this.fermetures.meta.last_page
      this.currentPage = this.fermetures.meta.current_page
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
