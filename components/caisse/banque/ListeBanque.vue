<template>
  <b-card aria-hidden="true" header="Liste des Banques">
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
            @click="$bvModal.show('modalCreateBanque')"
          />
          <feather
            v-b-tooltip.hover.top
            title="imprimer liste"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="printer"
            @click="imprimer"
          />
        </div>
      </div>
      <hr class="mg-t-4" />
      <b-form-input
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
        :items="banques"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucune banques"
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
          <a type="button" @click="editer(data.item)">
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </a>
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
      <CreateBanqueModal />
      <div>
        <EditBanqueModal v-if="edit.modal" v-model="edit.modal" :current="edit.banque" />
      </div>
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateBanqueModal from './CreateBanqueModal.vue'
import EditBanqueModal from './EditBanqueModal.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    CreateBanqueModal,
    EditBanqueModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'sigle', label: 'Sigle' },
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
    edit: { modal: false, banque: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getBanques()
    this.totalRows = this.banques.length
  },
  computed: {
    ...mapGetters({ banques: 'caisse/banque/banques' }),
    records() {
      return this.banques.map((banque) => {
        return {
          nom: banque.nom,
          sigle: banque.sigle,
          date: this.$moment(banque.created_at).format('llll'),
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getOne: 'caisse/banque/getOne',
      getBanques: 'caisse/banque/getAll',
    }),
    imprimer() {
      const columns = ['nom', 'sigle', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des banques')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'attention'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
    editer({ id }) {
      this.getOne(id).then(({ banque }) => {
        this.edit.modal = true
        this.edit.banque = banque
        this.$bvModal.show('modalEditBanque')
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
