<template>
  <div>
    <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
      <b-card aria-hidden="true" header="Liste des permissions">
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
            </div>
          </div>
          <!-- btn-toolbar -->
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
            :filter="filter"
            @filtered="onFiltered"
          >
            <template #cell(created_at)="data">
              {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
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
            align="right"
            size="sm"
            aria-controls="table"
          ></b-pagination>
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    fields: [
      { key: 'name', label: 'Nom', tdClass: 'wd-30p', sortable: true },
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
  fetch() {
    this.getAll().then(() => {
      this.totalRows = this.permissions.length
    })
  },
  computed: {
    ...mapGetters('user-role/permission', ['permissions']),
  },
  methods: {
    ...mapActions('user-role/permission', ['getAll']),
    imprimer() {},
    dialoger({ id, name }) {
      this.dialogData.nom = name
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('modal')
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
