<template>
  <b-card aria-hidden="true" header="Liste des zones">
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
            @click="$bvModal.show('modalCreateZone')"
          />
          <feather
            v-b-tooltip.hover.top
            title="imprimer liste"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="printer"
            @click="imprimer"
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
        :items="zones"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucune zone"
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
        <template #cell(index)="data">
          {{ data.index + 1 }}
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
        v-if="totalRows > 0"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        aria-controls="table"
      ></b-pagination>
      <CreateZoneModal />
      <div>
        <EditZoneModal v-if="edit.modal" v-model="edit.modal" :current="edit.zone" />
      </div>
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateZoneModal from './CreateZoneModal.vue'
import EditZoneModal from './EditZoneModal.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    CreateZoneModal,
    EditZoneModal,
  },
  data: () => ({
    fields: [
      'index',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'niveau', label: 'Niveaux', sortable: true },
      { key: 'pavillon', label: 'Pavillons', sortable: true },
      { key: 'site', label: 'Sites', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, zone: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getZones()
    this.totalRows = this.zones.length
  },
  computed: {
    ...mapGetters({ zones: 'architecture/zone/zones' }),
    records() {
      return this.zones.map((zone) => {
        return {
          code: zone.code,
          niveau: zone.niveau,
          pavillon: zone.pavillon,
          site: zone.site,
          date: zone.created_at,
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/zone/getOne',
      getZones: 'architecture/zone/getAll',
    }),
    imprimer() {
      const columns = ['code', 'niveau', 'pavillon', 'site', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des zones')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'attention'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('zoneConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ zone }) => {
        this.edit.zone = zone
        this.edit.modal = true
        this.$bvModal.show('modalEditZone')
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
