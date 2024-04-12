<template>
  <b-card aria-hidden="true" header="Liste des Ouvertures de Caisse">
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
          @click="create = true"
        />
      </div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon code, caissier, guichet et date"
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
        :items="ouvertures.data"
        :fields="fields"
        responsive
        empty-text="Aucune Ouverture de caisse"
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
      <CreateOuvertureModal v-if="create" v-model="create" :ouvertures="ouvertures.data" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateOuvertureModal from './CreateOuvertureModal.vue'
import { OUVERTURE } from '~/helper/constantes'
import { ouverture } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { CreateOuvertureModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code' },
      { key: 'guichet.site.nom', label: 'Marché' },
      { key: 'caissier.user.name', label: 'Caissier' },
      { key: 'guichet.nom', label: 'Guichet' },
      { key: 'created_at', label: 'Crée le', sortable: true },
      { key: 'status', label: 'Statut' },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    create: false,
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
    permissions: ouverture,
  }),
  async fetch() {
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({ ouvertures: MODULES.OUVERTURE.GETTERS.OUVERTURES }),
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
      getPaginate: MODULES.OUVERTURE.ACTIONS.PAGINATE,
      getSearch: MODULES.OUVERTURE.ACTIONS.SEARCH,
    }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('ouvertureConfirmationListe')
    },
    statusClass(value) {
      const classes = {
        [OUVERTURE.confirmed]: 'badge badge-danger-light',
        [OUVERTURE.using]: 'badge badge-primary-light',
      }
      return classes[value]
    },
    pageInit() {
      this.pages = this.ouvertures.meta.last_page
      this.currentPage = this.ouvertures.meta.current_page
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
