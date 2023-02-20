<template>
  <div>
    <b-card aria-hidden="true" header="Liste des niveaux">
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
              @click="$bvModal.show('modalCreateNiveau')"
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
          :items="niveaux"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun niveau"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(created_at)="data">
            {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
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
        <CreateNiveauModal :pavillons="pavillons" />
        <div>
          <EditNiveauModal
            :key="edit.modal"
            v-model="edit.modal"
            :pavillons="pavillons"
            :current="edit.niveau"
          />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateNiveauModal from './CreateNiveauModal.vue'
import EditNiveauModal from './EditNiveauModal.vue'
export default {
  components: {
    CreateNiveauModal,
    EditNiveauModal,
  },
  props: {
    pavillons: {
      type: Array,
      required: true,
    },
    niveaux: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      'index',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'pavillon.nom', label: 'Pavillon', sortable: true },
      { key: 'pavillon.site.nom', label: 'Site', sortable: true },
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
    edit: { modal: false, niveau: {} },
    filter: null,
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.niveaux.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/niveau/getOne',
    }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('niveauConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ niveau }) => {
        this.edit.niveau = niveau
        this.edit.modal = true
        this.$bvModal.show('modalEditNiveau')
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
