<template>
  <div class="mt-2">
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
      :items="emplacements"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      responsive
      empty-text="Aucun emplacement"
      show-empty
      :filter="filter"
      @filtered="onFiltered"
    >
      <template #cell(option)="data">
        <a v-if="data.item.montant" type="button" @click="details(data.item)">
          <feather title="calendrier des collectes" type="calendar" size="20" stroke="orange" />
        </a>
      </template>
      <template #empty="scope">
        <h6 class="text-center text-muted pd-y-10">
          {{ scope.emptyText }}
        </h6>
      </template>
    </b-table>
    <b-pagination
      v-if="totalRows > 0"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="right"
      size="sm"
      aria-controls="table"
    ></b-pagination>
    <CalendarCollecteModal
      v-if="calendar.modal"
      v-model="calendar.modal"
      :emplacement="calendar.emplacement"
    />
  </div>
</template>

<script>
import CalendarCollecteModal from './CalendarCollecteModal.vue'
export default {
  components: { CalendarCollecteModal },
  props: {
    emplacements: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      { key: 'code', label: 'Emplacement' },
      { key: 'loyer', label: 'Loyer' },
      {
        key: 'montant',
        label: 'Collecté',
        filterByFormatted: true,
        sortByFormatted: true,
        formatter: (value, key, item) => {
          return value ?? 0
        },
      },
      {
        key: 'jours',
        label: 'Nbre jours',
        sortByFormatted: true,
        filterByFormatted: true,
        formatter: (value, key, item) => {
          return item.montant ? item.montant / item.loyer : 0
        },
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    calendar: { modal: false, emplacement: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.totalRows = this.emplacements.length
  },
  methods: {
    details({ id, code }) {
      this.calendar.emplacement = { id, code }
      this.calendar.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
