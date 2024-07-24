<template>
  <b-card aria-hidden="true" header="Liste encaissements">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          v-can="permissions.fermeture.create"
          title="fermer"
          class="btn btn-sm btn-danger btn-icon"
          stroke-width="2"
          size="18"
          type="x-square"
          @click="close = true"
        />
        <feather
          v-b-tooltip.hover.top
          v-can="permissions.encaissement.create"
          title="créer"
          class="btn btn-sm btn-primary btn-icon mr-1"
          stroke-width="2"
          size="18"
          type="plus"
          @click="dialog = true"
        />
      </div>
      <hr class="mg-t-4" />
      <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Rechercher" class="mg-y-10" :debounce="500"></b-form-input>
      <b-table
        id="table"
        class="table"
        hover
        small
        bordered
        primary-key="id"
        :items="encaissements"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun Encaissement"
        :busy="$fetchState.pending"
        show-empty
        :filter="filter"
        @filtered="onFiltered"
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
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm" aria-controls="table"></b-pagination>
      <CreateEncaissement v-if="dialog" v-model="dialog" />
      <ShowEncaissementModal v-if="show.modal" :id="show.id" v-model="show.modal" />
      <CloseEncaissementModal v-if="close" v-model="close" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateEncaissement from './CreateEncaissement.vue'
import ShowEncaissementModal from './ShowEncaissementModal.vue'
import CloseEncaissementModal from './CloseEncaissementModal.vue'
import { fermeture, encaissement } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { CreateEncaissement, ShowEncaissementModal, CloseEncaissementModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code' },
      { key: 'caissier.user.name', label: 'Caissier' },
      { key: 'type', label: 'Payement' },
      {
        key: 'montant',
        label: 'Montant à payer',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.montant : item.valeur
        },
      },
      {
        key: 'versement',
        label: 'Montant versé',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.versement : item.valeur
        },
      },
      {
        key: 'monnaie',
        label: 'Monnaie',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.versement - item.montant : 0
        },
      },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    dialog: false,
    dialogData: { modal: false, id: 0, nom: '' },
    show: { modal: false, id: 0 },
    close: false,
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
    permissions: { fermeture, encaissement },
  }),
  async fetch() {
    await this.getEncaissements()
    this.totalRows = this.encaissements.length
  },
  computed: {
    ...mapGetters({ encaissements: MODULES.ENCAISSEMENT.GETTERS.ENCAISSEMENTS }),
  },
  methods: {
    ...mapActions({ getEncaissements: MODULES.ENCAISSEMENT.ACTIONS.ALL }),
    detail({ id }) {
      this.show.id = id
      this.show.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
