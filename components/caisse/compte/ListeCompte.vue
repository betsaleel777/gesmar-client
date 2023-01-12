<template>
  <div>
    <b-card aria-hidden="true" header="Liste des Comptes">
      <b-card-text>
        <div class="btn-toolbar d-flex flex-row-reverse">
          <div class="">
            <feather
              v-b-tooltip.hover.top
              title="créer"
              class="btn btn-sm btn-primary btn-icon"
              stroke-width="2"
              size="18"
              type="plus"
              @click="$bvModal.show('modalCreateCompte')"
            />
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
          :items="comptes"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucune compte"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(ordre)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(option)="data">
            <a type="button" @click="editer(data.item)">
              <feather title="modifier" type="edit" size="20" stroke="blue" />
            </a>
          </template>
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
        <CreateCompteModal />
        <div>
          <EditCompteModal v-if="edit.modal" v-model="edit.modal" :current="edit.compte" />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateCompteModal from './CreateCompteModal.vue'
import EditCompteModal from './EditCompteModal.vue'
export default {
  components: {
    CreateCompteModal,
    EditCompteModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'code', label: 'Code', sortable: true },
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
    edit: { modal: false, compte: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getComptes().then(() => {
      this.totalRows = this.comptes.length
    })
  },
  computed: {
    ...mapGetters({ comptes: 'caisse/compte/comptes' }),
  },
  methods: {
    ...mapActions({
      getOne: 'caisse/compte/getOne',
      getComptes: 'caisse/compte/getAll',
    }),
    imprimer() {},
    editer({ id }) {
      this.getOne(id).then(({ compte }) => {
        this.edit.modal = true
        this.edit.compte = compte
        this.$bvModal.show('modalEditCompte')
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
