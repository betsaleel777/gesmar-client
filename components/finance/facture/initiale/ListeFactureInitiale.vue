<template>
  <div>
    <b-card aria-hidden="true" header="Liste des factures initiales">
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
          v-if="totalRows > 0"
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
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(status)="data">
            <span :class="statusClass(data.item.status)">{{
              data.item.status
            }}</span>
          </template>
          <template #cell(option)="data">
            <a type="button" @click="editer(data.item)">
              <feather title="modifier" type="edit" size="20" stroke="blue" />
            </a>
          </template>
          <template #cell(created_at)="data">
            {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
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
        <div></div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { FACTURE } from '~/helper/constantes'
export default {
  components: {},
  props: {
    factures: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      'index',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat.code', label: 'Contrat', sortable: true },
      { key: 'contrat.personne.nomComplet', label: 'Personne', sortable: true },
      {
        key: 'contrat.emplacement.code',
        label: 'Emplacement',
        tdClass: 'text-center',
        sortable: true,
      },
      {
        key: 'avance',
        label: 'Avance',
        formatter: (value) => {
          return value + ' mois'
        },
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'caution',
        label: 'Caution',
        formatter: (value) => {
          return value + ' mois'
        },
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'pas_porte',
        label: 'Pas de porte',
        formatter: (value) => {
          return Number(value)
        },
        tdClass: 'text-right',
        sortable: true,
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
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.factures.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'facture/annexe/getOne',
    }),
    imprimer() {},
    editer({ id }) {
      this.getOne(id).then(({ facture }) => {
        this.edit.facture = facture
        this.edit.modal = true
        this.$bvModal.show('modalEditFactureAnnexe')
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      if (value === FACTURE.status.schedulable) {
        return 'badge badge-warning-light'
      } else if (value === FACTURE.status.paid) {
        return 'badge badge-success-light'
      } else {
        return 'badge badge-danger-light'
      }
    },
  },
}
</script>
<style></style>
