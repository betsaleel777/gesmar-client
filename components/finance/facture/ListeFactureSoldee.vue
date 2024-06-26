<template>
  <b-card aria-hidden="true" header="Liste des factures soldées">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse"></div>
      <hr class="mg-t-4" />
      <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Rechercher" class="mg-y-10" :debounce="500"></b-form-input>
      <b-table
        id="table"
        class="table"
        hover
        small
        bordered
        primary-key="id"
        :items="factures"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucune facture"
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
        <template #cell(ordre)="data">{{ data.index + 1 }}</template>
        <template #cell(status)="data">
          <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
        </template>
        <template #cell(option)="data">
          <a type="button" @click="details(data.item)">
            <feather title="détails" type="eye" size="20" stroke="indigo" />
          </a>
        </template>
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #cell(produit)="data">
          <span v-if="data.item.contrat.emplacement">{{ data.item.contrat.emplacement.code }}</span>
          <span v-else>{{ data.item.contrat.annexe.nom }}</span>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">{{ scope.emptyText }}</h6>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm" aria-controls="table"></b-pagination>
    </b-card-text>
    <ShowFactureAnnexeModal v-if="show.annexe.modal" :id="show.annexe.id" v-model="show.annexe.modal" />
    <ShowFactureGearModal v-if="show.equipement.modal" :id="show.equipement.id" v-model="show.equipement.modal" />
    <ShowFactureInitialeModal v-if="show.initiale.modal" :id="show.initiale.id" v-model="show.initiale.modal" />
    <ShowFactureLoyerModal v-if="show.loyer.modal" :id="show.loyer.id" v-model="show.loyer.modal" />
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowFactureAnnexeModal from './annexe/ShowFactureAnnexeModal.vue'
import ShowFactureInitialeModal from './initiale/ShowFactureInitialeModal.vue'
import ShowFactureGearModal from './equipement/ShowFactureGearModal.vue'
import ShowFactureLoyerModal from './loyer/ShowFactureLoyerModal.vue'
import { FACTURE } from '~/helper/constantes'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { ShowFactureAnnexeModal, ShowFactureGearModal, ShowFactureInitialeModal, ShowFactureLoyerModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat.code', label: 'Contrat', sortable: true },
      { key: 'contrat.personne.fullname', label: 'Personne', sortable: true },
      { key: 'produit', label: 'Produit', tdClass: 'text-center', thClass: 'text-center', sortable: true },
      { key: 'created_at', label: 'Date', tdClass: 'text-center', thClass: 'text-center' },
      { key: 'status', label: 'Statut', tdClass: 'text-center', thClass: 'text-center' },
      { key: 'option', label: 'Options', tdClass: 'text-center', thClass: 'wd-5p text-center', sortable: false },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    show: {
      loyer: { modal: false, id: 0 },
      initiale: { modal: false, id: 0 },
      annexe: { modal: false, id: 0 },
      equipement: { modal: false, id: 0 },
    },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getFactures()
    this.totalRows = this.factures.length
  },
  computed: {
    ...mapGetters({ factures: 'facture/facture/soldees' }),
  },
  methods: {
    ...mapActions({ getOne: MODULES.FACTURE.ACTIONS.ONE, getFactures: MODULES.FACTURE.ACTIONS.ALL }),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
    details({ type, id }) {
      this.show[type].id = id
      this.show[type].modal = true
    },
  },
}
</script>
<style></style>
