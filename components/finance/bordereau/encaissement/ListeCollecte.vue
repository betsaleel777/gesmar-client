<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <b-card aria-hidden="true" header="Liste des Encaissements de Bordereaux">
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
              @click="dialog = true"
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
            {{ $moment(data.item.jour).format('DD-MM-YYYY') }}
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
      </b-card-text>
    </b-card>
    <CreateCollecteModal v-if="dialog" v-model="dialog" />
  </b-overlay>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateCollecteModal from './CreateCollecteModal.vue'
import { ATTRIBUTION } from '~/helper/constantes'
export default {
  components: { CreateCollecteModal },
  data: () => ({
    dialog: false,
    fields: [
      'ordre',
      { key: 'bordereau.code', label: 'Numéro du bordereau', sortable: false },
      { key: 'emplacement.code', label: "Code d'emplacement", sortable: false },
      { key: 'commercial.user.name', label: 'Nom Du commercial', sortable: false },
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
  fetch() {
    this.getAll().then(() => (this.totalRows = this.attributions.length))
  },
  computed: {
    ...mapGetters('finance/attribution', ['attributions']),
  },
  methods: {
    ...mapActions({ getAll: 'finance/attribution/getAllWithBorderau' }),
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
