<template>
  <b-card aria-hidden="true" header="Liste des permissions">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse"></div>
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
        :items="permissions"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucune permissions"
        show-empty
        :busy="$fetchState.pending"
        :filter="filter"
        @filtered="onFiltered"
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Chargement...</strong>
          </div>
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
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm" aria-controls="table"></b-pagination>
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    fields: [
      { key: 'name', label: 'clé', tdClass: 'wd-30p', sortable: true },
      { key: 'description', label: 'Description', sortable: false },
      {
        key: 'created_at',
        label: 'Créer le',
        tdClass: 'wd-10p',
        sortable: true,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    filter: null,
    totalRows: 1,
    currentPage: 1,
    perPage: 20,
  }),
  async fetch() {
    await this.getAll()
    this.totalRows = this.permissions.length
  },
  computed: {
    ...mapGetters('user-role/permission', ['permissions']),
  },
  methods: {
    ...mapActions('user-role/permission', ['getAll']),
    dialoger({ id, name }) {
      this.dialogData.nom = name
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('modal')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
