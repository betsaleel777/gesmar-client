<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
      <b-card aria-hidden="true" header="Liste des factures de loyer">
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
                @click="$bvModal.show('modalGenererLoyer')"
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
            show-empty
            :filter="filter"
            @filtered="onFiltered"
          >
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
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
            size="sm"
            aria-controls="table"
          ></b-pagination>
          <GenerateFactureLoyerModal />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import GenerateFactureLoyerModal from './GenerateFactureLoyerModal.vue'
import { FACTURE } from '~/helper/constantes'
export default {
  components: { GenerateFactureLoyerModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat.code', label: 'Contrat', sortable: true },
      { key: 'contrat.personne.alias', label: 'Personne', sortable: true },
      {
        key: 'contrat.emplacement.code',
        label: 'Emplacement',
        tdClass: 'text-center',
        sortable: true,
      },
      {
        key: 'contrat.emplacement.loyer',
        label: 'Loyer',
        formatter: (value) => {
          return value + ' FCFA'
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
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getFactures().then(() => {
      this.totalRows = this.factures.length
    })
  },
  computed: {
    ...mapGetters({
      factures: 'facture/loyer/factures',
    }),
  },
  methods: {
    ...mapActions({
      getOne: 'facture/loyer/getOne',
      getFactures: 'facture/loyer/getAll',
    }),
    imprimer() {},
    editer({ id }) {
      this.getOne(id).then(({ facture }) => {
        this.edit.facture = facture
        this.edit.modal = true
        this.$bvModal.show('modalEditFactureLoyer')
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
