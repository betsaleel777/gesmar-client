<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <b-card aria-hidden="true" header="Liste des abonnements">
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
              @click="$bvModal.show('modalCreateAbonnement')"
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
          :items="abonnements"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun abonnement"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(option)="data">
            <a v-if="data.item.status === STATUS.progressing" type="button" @click="resilier(data.item)">
              <feather title="résilier" type="x-octagon" size="20" stroke="red" />
            </a>
            <a v-if="data.item.status === STATUS.error" type="button" @click="confirmer(data.item)">
              <feather title="confimer" type="check-circle" size="20" stroke="blue" />
            </a>
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(status)="data">
            <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
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
        <CreateAbonnementModal :marches="marches" />
        <div>
          <FinishAbonnementModal v-if="edit.modal" v-model="edit.modal" :current="edit.abonnement" />
          <ValidateAbonnementModal v-if="confirm.modal" v-model="confirm.modal" :infos="confirm.validation" />
        </div>
      </b-card-text>
    </b-card>
  </b-overlay>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FinishAbonnementModal from './FinishAbonnementModal.vue'
import CreateAbonnementModal from './CreateAbonnementModal.vue'
import ValidateAbonnementModal from './ValidateAbonnementModal.vue'
import { ABONNEMENT } from '~/helper/constantes'
export default {
  components: {
    CreateAbonnementModal,
    FinishAbonnementModal,
    ValidateAbonnementModal,
  },
  data: () => ({
    STATUS: ABONNEMENT,
    fields: [
      'index',
      { key: 'code', label: 'Code', sortable: true },
      {
        key: 'equipement.code',
        label: 'Equipement',
        tdClass: 'text-primary',
        sortable: true,
      },
      {
        key: 'emplacement.code',
        label: 'Emplacement',
        tdClass: 'text-primary',
        sortable: true,
      },
      { key: 'index_autre', label: 'Index lu', sortable: true },
      {
        key: 'index_fin',
        label: 'Index fin',
        formatter: (value) => {
          return Number(value)
        },
        filterByFormatted: true,
        sortByFormatted: true,
        sortable: true,
      },
      {
        key: 'status',
        label: 'Statut',
        tdClass: 'text-center',
        thClass: 'wd-5p text-center',
        sortable: true,
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    edit: { modal: false, abonnement: {} },
    confirm: { modal: false, validation: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getMarches()
    this.getEmplacements()
    this.getEquipements()
    this.getAbonnements().then(() => {
      this.totalRows = this.abonnements.length
    })
  },
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
      equipements: 'architecture/equipement/equipements',
      emplacements: 'architecture/emplacement/equipables',
      abonnements: 'architecture/abonnement/abonnements',
    }),
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/abonnement/getOne',
      getEmplacements: 'architecture/emplacement/getEquipables',
      getMarches: 'architecture/marche/getAll',
      getAbonnements: 'architecture/abonnement/getAll',
      getEquipements: 'architecture/equipement/getAll',
    }),
    imprimer() {},
    resilier({ id }) {
      this.getOne(id).then(({ abonnement }) => {
        this.edit.abonnement = abonnement
        this.edit.modal = true
        this.$bvModal.show('modalFinishAbonnement')
      })
    },
    confirmer({ id, code }) {
      this.confirm.validation = { abonnement_id: id, code }
      this.confirm.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      return value === ABONNEMENT.progressing ? 'badge badge-primary-light' : 'badge badge-danger-light'
    },
  },
}
</script>
<style></style>
