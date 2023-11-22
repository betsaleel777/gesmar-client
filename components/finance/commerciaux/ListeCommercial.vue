<template>
  <b-card aria-hidden="true" header="Liste des commerciaux">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          v-can="permissions.create"
          title="créer"
          class="btn btn-sm btn-primary btn-icon mx-1"
          stroke-width="2"
          size="18"
          type="plus"
          @click="createModal = true"
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
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon le code,le nom, la date"
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
        :items="commerciaux.data"
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
        <template #cell(option)="data">
          <nuxt-link
            v-permission:all="permissions.edit + '|' + accesParametre"
            :to="`/parametre/utilisateur/${data.item.user.id}/settings`"
          >
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </nuxt-link>
          <a type="button" @click="attribuer(data.item)">
            <feather title="attribuer" type="calendar" size="20" stroke="green" />
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
      <CreateCommecialModal v-if="createModal" v-model="createModal" />
      <CreateBorderauModal v-if="attribution.modal" :id="attribution.id" v-model="attribution.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateBorderauModal from '../bordereau/CreateBorderauModal.vue'
import CreateCommecialModal from './CreateCommecialModal.vue'
import { finance, parametre } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
const permissions = finance.bordereaux.commerciaux
const accesParametre = parametre.acceder
export default {
  components: { CreateCommecialModal, CreateBorderauModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'user.name', label: 'Nom', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    show: { modal: false, commercial: {} },
    attribution: { modal: false, id: 0 },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    permissions,
    accesParametre,
    createModal: false,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ commerciaux: MODULES.COMMERCIAL.GETTERS.COMMERCIAUX }),
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
      getPaginate: MODULES.COMMERCIAL.ACTIONS.PAGINATE,
      getSearch: MODULES.COMMERCIAL.ACTIONS.SEARCH,
    }),
    attribuer({ id }) {
      this.attribution.id = id
      this.attribution.modal = true
    },
    pageInit() {
      this.pages = this.commerciaux.meta.last_page
      this.currentPage = this.commerciaux.meta.current_page
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
