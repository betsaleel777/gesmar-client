<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
      <b-card aria-hidden="true" header="Marchés Archivées">
        <b-card-text>
          <div class="btn-toolbar d-flex flex-row-reverse">
            <div class="">
              <feather
                v-b-tooltip.hover.top
                title="imprimer liste"
                class="btn btn-sm btn-primary btn-icon"
                stroke-width="2"
                size="18"
                type="printer"
              />
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
          </div>
          <!-- btn-toolbar -->
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
            :items="emplacements"
            :fields="fields"
            responsive
            empty-text="Aucun emplacements archivés"
            show-empty
            :filter="filter"
            @filtered="onFiltered"
          >
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
            v-if="totalRows > 0"
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
            modal-id="emplacementConfirmationArchive"
            action="architecture/emplacement/restaurer"
            :message="`Voulez vous réelement restaurer l'emplacement ${dialogData.nom}`"
            @confirmed="$emit('back')"
          />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
  },
  data: () => ({
    fields: [
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'superficie', label: 'Superficie', sortable: true },
      { key: 'zone.nom', label: 'Zone', sortable: true },
      { key: 'type.nom', label: 'Type', sortable: true },
      { key: 'loyer', label: 'Loyer', tdClass: 'text-right', sortable: true },
      {
        key: 'pas_porte',
        label: 'Pas de porte',
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-20p text-center',
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
      this.totalRows = this.emplacements.length
    })
  },
  computed: {
    ...mapGetters('architecture/emplacement', ['emplacements']),
  },
  methods: {
    ...mapActions('architecture/emplacement', ['getTrashAll']),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('emplacementConfirmationArchive')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
