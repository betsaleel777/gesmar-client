<template>
  <b-card aria-hidden="true" header="Liste des Ouvertures de Caisse">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          v-can="permissions.created_at"
          title="créer"
          class="btn btn-sm btn-primary btn-icon mx-1"
          stroke-width="2"
          size="18"
          type="plus"
          @click="create = true"
        />
        <feather
          v-b-tooltip.hover.top
          title="imprimer liste"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="printer"
          @click="imprimer"
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
import { capitalize, arrayPdf } from '~/helper/helpers'
import { finance } from '~/helper/permissions'
const permissions = finance.caisse.ouverture
export default {
  components: {
    CreateOuvertureModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code' },
      { key: 'site', label: 'Marché' },
      { key: 'caissier', label: 'Caissier' },
      { key: 'guichet', label: 'Guichet' },
      { key: 'created_at', label: 'Crée le', sortable: true },
      { key: 'status', label: 'Statut' },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    create: false,
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
    ...mapGetters({ ouvertures: 'caisse/ouverture/ouvertures' }),
    records() {
      return this.ouvertures.map((ouverture) => {
        return {
          code: ouverture.code,
          site: ouverture.guichet.site.nom,
          caissier: ouverture.caissier.user.name,
          date: this.$moment(ouverture.created_at).format('llll'),
        }
      })
    },
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
    ...mapActions({ getPaginate: 'caisse/ouverture/getPaginate', getSearch: 'caisse/ouverture/getSearch' }),
    imprimer() {
      const columns = ['code', 'site', 'caissier', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des ouvertures')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'information'.toLocaleUpperCase(),
          variant: 'info',
          solid: true,
        })
    },
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
