<template>
  <b-card aria-hidden="true" header="Liste des abonnements">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <div class="">
          <feather
            v-b-tooltip.hover.top
            title="créer"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="plus"
            @click="create = true"
          />
        </div>
      </div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon le code,equipement,emplacement"
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
        :items="abonnements.data"
        :fields="fields"
        responsive
        empty-text="Aucun abonnement"
        show-empty
        :busy="$fetchState.pending || loading"
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Chargement...</strong>
          </div>
        </template>
        <template #cell(option)="data">
          <a v-if="data.item.status === STATUS.progressing" type="button" @click="resilier(data.item)">
            <feather title="résilier" type="x-octagon" size="20" stroke="red" />
          </a>
          <a v-if="data.item.status === STATUS.error" type="button" @click="confirmer(data.item)">
            <feather title="confimer" type="check-circle" size="20" stroke="blue" />
          </a>
        </template>
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(status)="data">
          <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
        </template>
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
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
      <CreateAbonnementModal v-if="create" v-model="create" />
      <FinishAbonnementModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
      <ValidateAbonnementModal v-if="confirm.modal" :id="confirm.id" v-model="confirm.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FinishAbonnementModal from './FinishAbonnementModal.vue'
import CreateAbonnementModal from './CreateAbonnementModal.vue'
import ValidateAbonnementModal from './ValidateAbonnementModal.vue'
import { ABONNEMENT } from '~/helper/constantes'
import { MODULES } from '~/helper/modules-types'
export default {
  components: {
    CreateAbonnementModal,
    FinishAbonnementModal,
    ValidateAbonnementModal,
  },
  data: () => ({
    STATUS: ABONNEMENT,
    fields: [
      'index',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'equipement', label: 'Equipement', tdClass: 'text-primary', sortable: true },
      { key: 'emplacement', label: 'Emplacement', tdClass: 'text-primary', sortable: true },
      { key: 'index_lu', label: 'Index lu', sortable: true },
      { key: 'index_fin', label: 'Index fin', sortable: true },
      {
        key: 'status',
        label: 'Statut',
        tdClass: 'text-center',
        thClass: 'wd-5p text-center',
        sortable: true,
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    edit: { modal: false, id: 0 },
    confirm: { modal: false, id: 0 },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    create: false,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ abonnements: MODULES.ABONNEMENT.GETTERS.ABONNEMENTS }),
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
      getPaginate: MODULES.ABONNEMENT.ACTIONS.PAGINATE,
      getSearch: MODULES.ABONNEMENT.ACTIONS.SEARCH,
    }),
    resilier({ id }) {
      this.edit.id = id
      this.edit.modal = true
    },
    confirmer({ id }) {
      this.confirm.id = id
      this.confirm.modal = true
    },
    statusClass(value) {
      return value === ABONNEMENT.progressing ? 'badge badge-primary-light' : 'badge badge-danger-light'
    },
    pageInit() {
      this.pages = this.abonnements.meta.last_page
      this.currentPage = this.abonnements.meta.current_page
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
