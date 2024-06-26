<template>
  <b-card aria-hidden="true" header="Liste des bordereaux">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse"></div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon le code,le commercial, la date"
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
          <span :class="statusClass(data.item.status)">
            {{ data.item.status }}
          </span>
        </template>
        <template #cell(option)="data">
          <span v-if="data.item.status === status.uncashed">
            <a v-can="permissions.edit" type="button" @click="editDialog(data.item)">
              <feather title="modifier" type="edit" size="20" stroke="blue" />
            </a>
            <a v-can="permissions.collect" type="button" @click="collecter(data.item)">
              <feather title="collecter" type="calendar" size="20" stroke="orange" />
            </a>
          </span>
          <a v-can="permissions.show" type="button" @click="visualiser(data.item)">
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
      <EditBordereauModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
      <ShowBordereauModal v-if="show.modal" :id="show.id" v-model="show.modal" />
      <CollectBordereauModal v-if="collect.modal" :id="collect.id" v-model="collect.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import EditBordereauModal from './EditBordereauModal.vue'
import CollectBordereauModal from './CollectBordereauModal.vue'
import ShowBordereauModal from './ShowBordereauModal.vue'
import { BORDEREAU } from '~/helper/constantes'
import { MODULES } from '~/helper/modules-types'
import { bordereau } from '~/helper/permissions'
export default {
  components: { EditBordereauModal, CollectBordereauModal, ShowBordereauModal },
  data: () => ({
    status: BORDEREAU,
    fields: [
      'ordre',
      { key: 'code', label: 'Code' },
      { key: 'commercial.user.name', label: 'Commercial', sortable: true },
      { key: 'site.nom', label: 'Marché' },
      { key: 'status', label: 'Statuts', tdClass: 'text-center', thClass: 'text-center' },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    show: { modal: false, id: 0 },
    edit: { modal: false, id: 0 },
    collect: { modal: false, id: 0 },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    createModal: false,
    permissions: bordereau,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ bordereaux: MODULES.BORDEREAU.GETTERS.BORDEREAUX }),
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
      getPaginate: MODULES.BORDEREAU.ACTIONS.PAGINATE,
      getSearch: MODULES.BORDEREAU.ACTIONS.SEARCH,
    }),
    editDialog({ id }) {
      this.edit.id = id
      this.edit.modal = true
    },
    collecter({ id }) {
      this.collect.id = id
      this.collect.modal = true
    },
    visualiser({ id }) {
      this.show.id = id
      this.show.modal = true
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
    statusClass(value) {
      if (value === BORDEREAU.cashed) {
        return 'badge badge-success-light'
      } else {
        return 'badge badge-danger-light'
      }
    },
  },
}
</script>
<style></style>
