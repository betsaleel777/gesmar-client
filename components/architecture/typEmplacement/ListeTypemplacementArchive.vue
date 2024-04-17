<template>
  <b-card aria-hidden="true" header="Type d'emplacements Archivées">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          title="retour"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="arrow-left"
          @click="$emit('back')"
        />
      </div>
      <hr class="mg-t-4" />
      <b-form-input
        v-if="totalRows > 0"
        id="filter-input"
        v-model="filter"
        type="search"
        placeholder="Type to Search"
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
        :current-page="currentPage"
        :per-page="perPage"
        :items="types"
        :fields="fields"
        :busy="$fetchState.pending"
        responsive
        empty-text="Aucun type d'emplacement archivés"
        show-empty
        :filter="filter"
        @filtered="onFiltered"
      >
        <template #cell(option)="data">
          <feather
            v-can="permissions.restore"
            title="restaurer"
            type="rotate-cw"
            size="20"
            stroke="green"
            stroke-width="3"
            @click="dialoger(data.item)"
          />
        </template>
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">{{ scope.emptyText }}</h6>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="mg-y-1"
        aria-controls="table"
      ></b-pagination>
      <ConfirmationModal
        :id="dialogData.id"
        :key="dialogData.modal"
        v-model="dialogData.modal"
        :nom="dialogData.nom"
        modal-id="typemplConfirmationArchive"
        :action="actionRestore"
        :message="`Voulez vous réelement restaurer le type d'emplacement ${dialogData.nom}`"
        @confirmed="$emit('back')"
      />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { MODULES } from '~/helper/modules-types'
import { typeEmplacement } from '~/helper/permissions'
export default {
  components: { ConfirmationModal },
  data: () => ({
    fields: [
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'site.nom', label: 'Marché', sortable: true },
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
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
    actionRestore: MODULES.TYPE.EMPLACEMENT.ACTIONS.RESTORE,
    permissions: typeEmplacement,
  }),
  async fetch() {
    await this.getTrashAll()
    this.totalRows = this.types.length
  },
  computed: {
    ...mapGetters({ types: MODULES.TYPE.EMPLACEMENT.GETTERS.TYPES }),
  },
  methods: {
    ...mapActions({ getTrashAll: MODULES.TYPE.EMPLACEMENT.ACTIONS.TRASHED }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('typemplConfirmationArchive')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
