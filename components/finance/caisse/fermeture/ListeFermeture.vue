<template>
  <b-card aria-hidden="true" header="Point de caisse">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          title="imprimer liste"
          class="btn btn-sm btn-primary btn-icon mx-1"
          stroke-width="2"
          size="18"
          type="printer"
          @click="imprimer"
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
        :items="fermetures"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Liste vide"
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
      <b-pagination
        v-if="totalRows > 0"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        aria-controls="table"
      ></b-pagination>
      <ShowFermeture v-if="show.modal" :id="show.id" v-model="show.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowFermeture from './ShowFermeture.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: { ShowFermeture },
  data: () => ({
    fields: [
      'ordre',
      { key: 'caissier', label: 'Caissier' },
      { key: 'guichet', label: 'Guichet' },
      { key: 'total', label: 'Total encaissé' },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    show: { modal: false, id: null },
    close: false,
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getAll()
    this.totalRows = this.fermetures.length
  },
  computed: {
    ...mapGetters({ fermetures: 'caisse/fermeture/fermetures' }),
    records() {
      return this.fermetures.map((fermeture) => {
        return {
          code: fermeture.ordonnancement,
          caissier: fermeture.caissier,
          date: this.$moment(fermeture.created_at).format('llll'),
        }
      })
    },
  },
  methods: {
    ...mapActions({ getAll: 'caisse/fermeture/getAll' }),
    imprimer() {
      const columns = ['code', 'caissier', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des points de caisse')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'attention'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
    detail({ id }) {
      this.show.modal = true
      this.show.id = Number(id)
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
