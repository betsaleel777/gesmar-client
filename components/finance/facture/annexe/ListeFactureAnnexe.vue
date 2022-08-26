<template>
  <div>
    <b-card aria-hidden="true" header="Liste des factures annexes">
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
              @click="$bvModal.show('modalCreateFactureAnnexe')"
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
        <CreateFactureAnnexeModal :contrats="contrats" :personnes="personnes" />
        <div>
          <EditFactureAnnexeModal
            :key="edit.modal"
            v-model="edit.modal"
            :current="edit.facture"
            :contrats="contrats"
            :personnes="personnes"
          />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateFactureAnnexeModal from './CreateFactureAnnexeModal.vue'
import EditFactureAnnexeModal from './EditFactureAnnexeModal.vue'
import { FACTURE } from '~/helper/constantes'
export default {
  components: {
    CreateFactureAnnexeModal,
    EditFactureAnnexeModal,
  },
  props: {
    factures: {
      type: Array,
      required: true,
    },
    contrats: {
      type: Array,
      required: true,
    },
    personnes: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      'index',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'contrat.code', label: 'Contrat', sortable: true },
      { key: 'contrat.personne.nom', label: 'Personne', sortable: true },
      {
        key: 'annexe.nom',
        label: 'Service',
        tdClass: 'text-center',
        sortable: true,
      },
      {
        key: 'annexe.prix',
        label: 'Prix',
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
        thClass: 'wd-10p text-center',
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
      if (value === FACTURE.status.facture) {
        return 'badge badge-warning-light'
      } else if (value === FACTURE.status.paid) {
        return 'badge badge-success-light'
      } else if (value === FACTURE.status.proforma) {
        return 'badge badge-primary-light'
      } else {
        return 'badge badge-secondary-light'
      }
    },
  },
}
</script>
<style></style>
