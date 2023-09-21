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
        v-model="filter"
        type="search"
        placeholder="Rechercher"
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
        :items="commerciaux"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Tableau vide"
        show-empty
        :filter="filter"
        :busy="$fetchState.pending"
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
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #cell(option)="data">
          <a v-can="permissions.show" type="button" class="mr-1" @click="details(data.item)">
            <feather title="visualiser" type="eye" size="20" stroke="indigo" />
          </a>
          <a v-can="permissions.edit" type="button" class="mr-1" @click="transferer(data.item)">
            <feather :title="`transférer à ${data.item.name}`" type="refresh-ccw" size="20" stroke="orange" />
          </a>
          <a v-can="permissions.edit" type="button" class="mr-1" @click="attribuer(data.item.id)">
            <feather title="attribuer" type="calendar" size="20" stroke="green" />
          </a>
          <nuxt-link
            v-permission:all="permissions.edit + '|' + accesParametre"
            :to="`/parametre/utilisateur/${data.item.user_id}/settings`"
          >
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </nuxt-link>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">
            {{ scope.emptyText }}
          </h6>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        aria-controls="table"
      ></b-pagination>
      <CreateCommecialModal v-if="createModal" v-model="createModal" />
      <AttribuerBordereauModal v-if="attribution.modal" :id="attribution.id" v-model="attribution.modal" />
      <ShowAttributionBordereauModal v-if="show.modal" :id="show.id" v-model="show.modal" />
      <TransfererCommercialModal
        v-if="transfer.modal"
        :id="transfer.id"
        v-model="transfer.modal"
        :commerciaux="commerciaux"
      />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateCommecialModal from './CreateCommecialModal.vue'
import AttribuerBordereauModal from './AttribuerBordereauModal.vue'
import ShowAttributionBordereauModal from './ShowAttributionBordereauModal.vue'
import TransfererCommercialModal from './TransfererCommercialModal.vue'
import { finance, parametre } from '~/helper/permissions'
const permissions = finance.bordereaux.commerciaux
const accesParametre = parametre.acceder
export default {
  components: {
    CreateCommecialModal,
    AttribuerBordereauModal,
    ShowAttributionBordereauModal,
    TransfererCommercialModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'name', label: 'Nom', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    edit: { modal: false, commercial: {} },
    show: { modal: false, commercial: {} },
    transfer: { modal: false, commercial: {} },
    attribution: { modal: false, id: 0 },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
    permissions,
    accesParametre,
    createModal: false,
  }),
  async fetch() {
    await this.getAll()
    this.totalRows = this.commerciaux.length
  },
  computed: {
    ...mapGetters('finance/commercial', ['commerciaux']),
  },
  methods: {
    ...mapActions({ getAll: 'finance/commercial/getAll' }),
    imprimer() {},
    details({ id }) {
      this.show.id = id
      this.show.modal = true
    },
    attribuer(id) {
      this.attribution.id = id
      this.attribution.modal = true
    },
    transferer({ id }) {
      this.transfer.id = id
      this.transfer.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
