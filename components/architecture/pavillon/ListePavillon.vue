<template>
  <b-card aria-hidden="true" header="Liste des pavillons">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-can="permissions.create"
          v-b-tooltip.hover.top
          title="créer"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="plus"
          @click="create = true"
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
        :items="pavillons"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun Pavillon"
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
          <a v-can="permissions.edit" type="button" @click="editer(data.item)">
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
      <CreatePavillonModal v-if="create" v-model="create" />
      <EditPavillonModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreatePavillonModal from './CreatePavillonModal.vue'
import EditPavillonModal from './EditPavillonModal.vue'
import { MODULES } from '~/helper/modules-types'
import { pavillon } from '~/helper/permissions'
export default {
  components: { CreatePavillonModal, EditPavillonModal },
  data: () => ({
    fields: [
      'index',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'site.nom', label: 'Site', sortable: true },
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
    permissions: pavillon,
  }),
  async fetch() {
    await this.getPavillons()
    this.totalRows = this.pavillons.length
  },
  computed: {
    ...mapGetters({ pavillons: MODULES.PAVILLON.GETTERS.PAVILLON }),
  },
  methods: {
    ...mapActions({ getPavillons: MODULES.PAVILLON.ACTIONS.ALL }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('pavillonConfirmationListe')
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
