<template>
  <b-card aria-hidden="true" header="Liste des caissiers">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-can="permissions.caissier.create"
          v-b-tooltip.hover.top
          title="créer"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="plus"
          @click="create = true"
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
        :items="caissiers"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :busy="$fetchState.pending"
        responsive
        empty-text="Tableau vide"
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
        <template #cell(option)="data">
          <a v-can="permissions.caissier.show" type="button" class="mr-1" @click="details(data.item)">
            <feather title="visualiser" type="eye" size="20" stroke="indigo" />
          </a>
          <a v-can="permissions.caissier.attribuate" type="button" class="mr-1" @click="attribuer(data.item)">
            <feather title="attribuer" type="calendar" size="20" stroke="green" />
          </a>
          <nuxt-link
            v-can="permissions.utilisateur.edit"
            :to="`/parametre/utilisateur/${data.item.user_id}/settings`"
          >
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </nuxt-link>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">{{ scope.emptyText }}</h6>
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
      <CreateCaissierModal v-if="create" v-model="create" />
      <AttribuerGuichetModal
        v-if="attribution.modal"
        v-model="attribution.modal"
        :caissier-id="attribution.id"
      />
      <ShowCaissierModal v-if="show.modal" v-model="show.modal" :caissier-id="show.id" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowCaissierModal from './ShowCaissierModal.vue'
import CreateCaissierModal from './CreateCaissierModal.vue'
import AttribuerGuichetModal from './AttribuerGuichetModal.vue'
import { MODULES } from '~/helper/modules-types'
import { caissier, utilisateur } from '~/helper/permissions'
export default {
  components: { AttribuerGuichetModal, ShowCaissierModal, CreateCaissierModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'user', label: 'Nom', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    edit: { modal: false, id: 0 },
    show: { modal: false, id: 0 },
    attribution: { modal: false, id: 0 },
    create: false,
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
    permissions: { caissier, utilisateur },
  }),
  async fetch() {
    await this.getAll()
    this.totalRows = this.caissiers.length
  },
  computed: {
    ...mapGetters({ caissiers: MODULES.CAISSIER.GETTERS.CAISSIERS }),
  },
  methods: {
    ...mapActions({ getAll: MODULES.CAISSIER.ACTIONS.ALL }),
    details({ id }) {
      this.show.id = id
      this.show.modal = true
    },
    attribuer({ id }) {
      this.attribution.id = id
      this.attribution.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
