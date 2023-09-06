<template>
  <b-card aria-hidden="true" header="Liste des bordereaux">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <div class="">
          <feather
            v-b-tooltip.hover.top
            title="imprimer liste"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="printer"
          />
        </div>
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
        :items="bordereaux"
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
        <template #cell(date_attribution)="data">
          {{ $moment(data.item.date_attribution).format('DD-MM-YYYY') }}
        </template>
        <template #cell(status)="data">
          <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
        </template>
        <template #cell(option)="data">
          <a type="button" @click="details(data.item)">
            <feather title="visualiser" type="eye" size="20" stroke="indigo" />
          </a>
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
      <ShowBordereauModal v-if="show.modal" v-model="show.modal" :bordereau="show.bordereau" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowBordereauModal from './ShowBordereauModal.vue'
import { ATTRIBUTION } from '~/helper/constantes'
export default {
  components: {
    ShowBordereauModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code du bordereau', sortable: false },
      { key: 'commercial', label: 'Nom Du commercial', sortable: true },
      { key: 'date_attribution', label: 'Date', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      { key: 'status', label: 'Statuts', tdClass: 'text-center', thClass: 'text-center' },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    show: { modal: false, bordereau: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getAll()
    this.totalRows = this.bordereaux.length
  },
  computed: {
    ...mapGetters('finance/bordereau', ['bordereaux']),
  },
  methods: {
    ...mapActions({
      getAll: 'finance/bordereau/getAll',
      getOne: 'finance/bordereau/getOne',
    }),
    imprimer() {},
    details({ id, code }) {
      this.show.bordereau = { id, code }
      this.show.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      const classes = {
        [ATTRIBUTION.cashed]: 'badge badge-success-light',
        [ATTRIBUTION.uncashed]: 'badge badge-danger-light',
      }
      return classes[value]
    },
  },
}
</script>
<style></style>
