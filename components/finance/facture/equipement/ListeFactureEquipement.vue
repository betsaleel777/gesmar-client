<template>
  <b-card aria-hidden="true" header="Liste des factures d'équipement">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <div class="">
          <feather
            v-b-tooltip.hover.top
            title="générer"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="cpu"
            @click="$bvModal.show('genererGear')"
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
        <template #cell(ordre)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(status)="data">
          <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
        </template>
        <template #cell(option)="data">
          <a type="button" @click="editer(data.item)">
            <feather title="modifier" type="edit" size="20" stroke="blue" />
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
      <GenerateFactureGearModal />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import GenerateFactureGearModal from './GenerateFactureGearModal.vue'
import { FACTURE } from '~/helper/constantes'
export default {
  components: { GenerateFactureGearModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat_code', label: 'Contrat', sortable: true },
      { key: 'personne', label: 'Personne', sortable: true },
      {
        key: 'emplacement',
        label: 'Emplacement',
        tdClass: 'text-center',
        sortable: true,
      },
      {
        key: 'loyer',
        label: 'Loyer',
        formatter: (value) => {
          return value + ' FCFA'
        },
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'index_depart',
        label: 'Index D',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
      {
        key: 'index_fin',
        label: 'Index F',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
      {
        key: 'status',
        label: 'Statut',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-5p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, facture: {} },
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
    ...mapGetters({
      factures: 'facture/equipement/factures',
    }),
  },
  methods: {
    ...mapActions({
      getOne: 'facture/equipement/getOne',
      getGenerer: 'facture/equipement/generer',
      getFactures: 'facture/equipement/getAll',
    }),
    imprimer() {},
    editer({ id }) {
      this.getOne(id).then(({ facture }) => {
        this.edit.facture = facture
        this.edit.modal = true
        this.$bvModal.show('modalEditFactureEquipement')
      })
    },
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
  },
}
</script>
<style></style>
