<template>
  <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
    <b-card aria-hidden="true" header="Termes de contrats pour produit annexe archivés">
      <b-card-text>
        <div class="btn-toolbar d-flex flex-row-reverse">
          <div class="">
            <feather v-b-tooltip.hover.top title="imprimer liste" class="btn btn-sm btn-primary btn-icon" stroke-width="2" size="18" type="printer" />
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
          :items="termes"
          :fields="fields"
          responsive
          empty-text="Aucun termes archivés"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(option)="data">
            <feather title="restaurer" type="rotate-cw" size="20" stroke="green" stroke-width="3" @click="dialoger(data.item)" />
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
          :nom="dialogData.code"
          modal-id="termeContratAnnexeConfirmationArchive"
          action="template/terme-annexe/restaurer"
          :message="`Voulez vous réelement restaurer les termes: '${dialogData.code}'`"
          @confirmed="$emit('back')"
        />
      </b-card-text>
    </b-card>
  </b-overlay>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: { ConfirmationModal },
  data: () => ({
    fields: [
      'index',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'user.name', label: 'Utilisateur', sortable: true },
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
    dialogData: { modal: false, id: 0, code: '' },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getTrashAll().then(() => {
      this.totalRows = this.termes.length
    })
  },
  computed: {
    ...mapGetters('template/terme-annexe', ['termes']),
  },
  methods: {
    ...mapActions('template/terme-annexe', ['getTrashAll']),
    dialoger({ id, code }) {
      this.dialogData.code = code
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('termeContratAnnexeConfirmationArchive')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
