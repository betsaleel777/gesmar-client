<template>
  <b-card aria-hidden="true" header="Liste des types d'emplacements">
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
        :items="types"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun type d'emplacement"
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
          <a v-can="permissions.trash" type="button" @click="dialoger(data.item)">
            <feather title="archiver" type="trash-2" size="20" stroke="red" />
          </a>
        </template>
        <template #cell(equipable)="data">
          <span :class="statusClass(data.item.equipable)">{{
            data.item.equipable ? EQUIPABLE.with : EQUIPABLE.without
          }}</span>
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
      <ConfirmationModal
        :id="dialogData.id"
        :key="dialogData.modal"
        v-model="dialogData.modal"
        :nom="dialogData.nom"
        modal-id="typemplConfirmationListe"
        :action="actionDelete"
        :message="`Voulez vous réelement archiver le type d'emplacement ${dialogData.nom}`"
      />
      <CreateTypemplacementModal v-if="create" v-model="create" />
      <EditTypemplacementModal v-if="edit.modal" :id="edit.id" v-model="edit.modal" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateTypemplacementModal from './CreateTypemplacementModal.vue'
import EditTypemplacementModal from './EditTypemplacementModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { TYPEQUIPEMENT } from '~/helper/constantes'
import { typeEmplacement } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { ConfirmationModal, CreateTypemplacementModal, EditTypemplacementModal },
  data: () => ({
    EQUIPABLE: TYPEQUIPEMENT.equipable,
    fields: [
      'index',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'site.nom', label: 'Marché', sortable: true },
      { key: 'frais_dossier', label: 'Frais de dossier' },
      { key: 'frais_amenagement', label: "Frais d'amenagement" },
      {
        key: 'created_at',
        label: 'Crée le',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: true,
      },
      { key: 'equipable', label: 'Equipable', tdClass: 'wd-10p text-center', thClass: 'wd-10p text-center' },
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
    permissions: typeEmplacement,
    actionDelete: MODULES.TYPE.EMPLACEMENT.ACTIONS.TRASH,
  }),
  async fetch() {
    await this.getTypes()
    this.totalRows = this.types.length
  },
  computed: {
    ...mapGetters({ types: MODULES.TYPE.EMPLACEMENT.GETTERS.TYPES }),
  },
  methods: {
    ...mapActions({ getTypes: MODULES.TYPE.EMPLACEMENT.ACTIONS.ALL }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('typemplConfirmationListe')
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
      if (value) {
        return 'badge badge-success-light'
      } else {
        return 'badge badge-danger-light'
      }
    },
  },
}
</script>
<style></style>
