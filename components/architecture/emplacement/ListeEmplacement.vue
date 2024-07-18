<template>
  <b-card aria-hidden="true" header="Liste des emplacements">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          title="archives"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="archive"
          @click="$emit('archivage')"
        />
        <feather
          v-can="permissions.create"
          v-b-tooltip.hover.top
          title="créer"
          class="btn btn-sm btn-primary btn-icon mr-1"
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
        :items="emplacements"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun emplacement"
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
          <span :class="statusClass(data.item.disponibilite)">
            {{ data.item.disponibilite }}
          </span>
          <span :class="statusClass(data.item.liaison)">
            {{ data.item.liaison }}
          </span>
        </template>
        <template #cell(option)="data">
          <a v-can="permissions.edit" type="button" @click="editer(data.item)">
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </a>
          <a v-can="permissions.trash" type="button" @click="dialoger(data.item)">
            <feather title="archiver" type="trash-2" size="20" stroke="red" />
          </a>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">
            {{ scope.emptyText }}
          </h6>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" size="sm" aria-controls="table"></b-pagination>
      <ConfirmationModal
        :id="dialogData.id"
        :key="dialogData.modal"
        v-model="dialogData.modal"
        :nom="dialogData.nom"
        modal-id="emplacementConfirmationListe"
        :action="actionDelete"
        :message="`Voulez vous réelement archiver l'emplacement ${dialogData.nom}`"
      />
      <CreateEmplacementModal v-if="create" v-model="create" />
      <EditEmplacementModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateEmplacementModal from './CreateEmplacementModal.vue'
import EditEmplacementModal from './EditEmplacementModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { EMPLACEMENT } from '~/helper/constantes'
import { MODULES } from '~/helper/modules-types'
import { emplacement } from '~/helper/permissions'
export default {
  components: { ConfirmationModal, EditEmplacementModal, CreateEmplacementModal },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'superficie', label: 'Superficie', sortable: true },
      { key: 'type.nom', label: 'Type' },
      { key: 'loyer', label: 'Loyer', tdClass: 'text-right', thClass: 'text-right', sortable: true },
      { key: 'pas_porte', label: 'Pas de porte', tdClass: 'text-right', thClass: 'text-right', sortable: true },
      { key: 'status', label: 'Statuts', tdClass: 'text-center', thClass: 'text-center' },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-20p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, id: 0 },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
    create: false,
    permissions: emplacement,
    actionDelete: MODULES.EMPLACEMENT.ACTIONS.TRASH,
  }),
  async fetch() {
    await this.getEmplacements()
    this.totalRows = this.emplacements.length
  },

  computed: {
    ...mapGetters({ emplacements: MODULES.EMPLACEMENT.GETTERS.EMPLACEMENTS }),
  },
  methods: {
    ...mapActions({
      getOne: MODULES.EMPLACEMENT.ACTIONS.ONE,
      getEmplacements: MODULES.EMPLACEMENT.ACTIONS.ALL,
    }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('emplacementConfirmationListe')
    },
    editer({ id }) {
      this.edit.id = id
      this.edit.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      if (value === EMPLACEMENT.free || value === EMPLACEMENT.unlinked) {
        return 'badge badge-success-light'
      } else {
        return 'badge badge-danger-light'
      }
    },
  },
}
</script>
<style></style>
