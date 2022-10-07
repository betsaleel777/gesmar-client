<template>
  <b-modal v-model="dialog" scrollable size="lg" hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails du bordereau {{ bordereau.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
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
        :items="attributions"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Tableau vide"
        show-empty
        :filter="filter"
        @filtered="onFiltered"
      >
        <template #cell(ordre)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #cell(jour)="data">
          {{ $moment(data.item.date_attribution).format('DD-MM-YYYY') }}
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
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        aria-controls="table"
      ></b-pagination>
    </template>
  </b-modal>
</template>

<script>
import { ATTRIBUTION } from '~/helper/constantes'
export default {
  props: {
    bordereau: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'emplacement.code', label: 'Emplacement', sortable: false },
      { key: 'jour', label: 'Date', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'status',
        label: 'Statuts',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
    ],
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    attributions() {
      return this.bordereau.attributions
    },
  },
  methods: {
    imprimer() {},
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
