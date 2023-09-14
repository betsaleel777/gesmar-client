<template>
  <b-card aria-hidden="true" header="Liste des niveaux">
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
            @click="create = true"
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
        :items="niveaux"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun niveau"
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
      <CreateNiveauModal v-if="create" v-model="create" />
      <EditNiveauModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateNiveauModal from './CreateNiveauModal.vue'
import EditNiveauModal from './EditNiveauModal.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    CreateNiveauModal,
    EditNiveauModal,
  },
  data: () => ({
    fields: [
      'index',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'pavillon', label: 'Pavillon', sortable: true },
      { key: 'site', label: 'Site', sortable: true },
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
    edit: { modal: false, id: 0 },
    create: false,
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getNiveaux()
    this.totalRows = this.niveaux.length
  },
  computed: {
    ...mapGetters({ niveaux: 'architecture/niveau/niveaux' }),
    records() {
      return this.niveaux.map((niveau) => {
        return {
          nom: niveau.nom,
          pavillon: niveau.pavillon,
          site: niveau.site,
          date: niveau.created_at,
        }
      })
    },
  },
  methods: {
    ...mapActions({ getNiveaux: 'architecture/niveau/getAll' }),
    imprimer() {
      const columns = ['nom', 'pavillon', 'site', 'date']
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
      this.$bvModal.show('niveauConfirmationListe')
    },
    editer({ id }) {
      this.edit.id = id
      this.edit.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
