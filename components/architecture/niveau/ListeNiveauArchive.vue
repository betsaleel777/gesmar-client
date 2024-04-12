<template>
  <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
    <b-card aria-hidden="true" header="Niveaux Archivées">
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
          :items="niveaux"
          :fields="fields"
          responsive
          empty-text="Aucun Niveaux archivés"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(pavillon)="data">
            {{ data.item.pavillon.nom }}
          </template>
          <template #cell(created_at)="data">
            {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
          </template>
          <template #cell(option)="data">
            <feather
              title="restaurer"
              type="rotate-cw"
              size="20"
              stroke="green"
              stroke-width="3"
              @click="dialoger(data.item)"
            />
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
          modal-id="niveauConfirmationArchive"
          action="architecture/niveau/restaurer"
          :message="`Voulez vous réelement restaurer le niveau ${dialogData.nom}`"
          @confirmed="$emit('back')"
        />
      </b-card-text>
    </b-card>
  </b-overlay>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { MODULES } from '~/helper/modules-types'
export default {
  components: {
    ConfirmationModal,
  },
  data: () => ({
    fields: [
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'pavillon', label: 'Pavillon', sortable: true },
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
  }),
  fetch() {
    this.getTrashAll().then(() => {
      this.totalRows = this.niveaux.length
    })
  },
  computed: {
    ...mapGetters({ niveaux: MODULES.NIVEAU.GETTERS.NIVEAUX }),
  },
  methods: {
    ...mapActions({ getTrashAll: MODULES.NIVEAU.ACTIONS.TRASHED }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('niveauConfirmationArchive')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
