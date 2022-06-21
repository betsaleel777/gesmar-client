<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
      <b-card aria-hidden="true" header="Equipements Archivés">
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
            :items="equipements"
            :fields="fields"
            responsive
            empty-text="Aucun equipements archivés"
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
            <template #cell(status)="data">
              <span :class="statusClass(data.item.status)">{{
                data.item.status
              }}</span>
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
            modal-id="equipementConfirmationArchive"
            action="architecture/equipement/restaurer"
            :message="`Voulez vous réelement restaurer l'équipement ${dialogData.nom}`"
            @confirmed="$emit('back')"
          />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { EQUIPEMENT } from '~/helper/constantes'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
  },
  data: () => ({
    fields: [
      { key: 'code', label: 'Nom', sortable: true },
      {
        key: 'prix_unitaire',
        label: 'Prix Unitaire',
        tdClass: 'text-right',
        sortable: true,
      },
      { key: 'type.nom', label: 'Type' },
      { key: 'site.nom', label: 'Site' },
      { key: 'status', label: 'Statut' },
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
      this.totalRows = this.equipements.length
    })
  },
  computed: {
    ...mapGetters('architecture/equipement', ['equipements']),
  },
  methods: {
    ...mapActions('architecture/equipement', ['getTrashAll']),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('equipementConfirmationArchive')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      if (value === EQUIPEMENT.free) {
        return 'badge badge-success-light'
      } else if (value === EQUIPEMENT.busy) {
        return 'badge badge-danger-light'
      } else {
        return 'badge badge-warning-light'
      }
    },
  },
}
</script>
<style></style>
