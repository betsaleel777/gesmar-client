<template>
  <b-card aria-hidden="true" header="Liste des services annexes">
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
        :items="annexes"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun service annexe"
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
          <a v-can="permissions.edit" type="button" @click="editer(data.item)">
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </a>
          <a v-can="permissions.trash" type="button" @click="dialoger(data.item)">
            <feather title="archiver" type="trash-2" size="20" stroke="red" />
          </a>
        </template>
        <template #empty="scope"
          ><h6 class="text-center text-muted pd-y-10">
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
      <ConfirmationModal
        :id="dialogData.id"
        :key="dialogData.modal"
        v-model="dialogData.modal"
        :nom="dialogData.nom"
        modal-id="annexeConfirmationListe"
        :action="actionDelete"
        :message="`Voulez vous réelement archiver le service annexe: '${dialogData.nom}'`"
      />
      <CreateAnnexeModal v-if="create" v-model="create" />
      <EditAnnexeModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import EditAnnexeModal from './EditAnnexeModal.vue'
import CreateAnnexeModal from './CreateAnnexeModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { MODULES } from '~/helper/modules-types'
import { serviceAnnexe } from '~/helper/permissions'
export default {
  components: { ConfirmationModal, EditAnnexeModal, CreateAnnexeModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: false },
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'site.nom', label: 'Site' },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
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
    actionDelete: MODULES.ANNEXE.ACTIONS.TRASH,
    permissions: serviceAnnexe,
  }),
  async fetch() {
    try {
      await this.getServicesAnnexes()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
    this.totalRows = this.annexes.length
  },
  computed: {
    ...mapGetters({ annexes: MODULES.ANNEXE.GETTERS.ANNEXES }),
  },
  methods: {
    ...mapActions({ getServicesAnnexes: MODULES.ANNEXE.ACTIONS.ALL }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('annexeConfirmationListe')
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
