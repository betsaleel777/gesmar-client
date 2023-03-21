<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-card aria-hidden="true" header="Liste des Sociétés">
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
                @click="$bvModal.show('modalCreateSociete')"
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
            :items="societes"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            responsive
            empty-text="Aucune societes"
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
          <CreateSocieteModal />
          <div>
            <EditSocieteModal v-if="edit.modal" v-model="edit.modal" :current="edit.societe" />
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateSocieteModal from '~/components/architecture/societe/CreateSocieteModal.vue'
import EditSocieteModal from '~/components/architecture/societe/EditSocieteModal.vue'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    CreateSocieteModal,
    EditSocieteModal,
    PartialBreadcrumb,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Société' }],
    fields: [
      'ordre',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'sigle', label: 'Sigle' },
      { key: 'siege', label: 'Siège' },
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
    edit: { modal: false, societe: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getSocietes().then(() => {
      this.totalRows = this.societes.length
    })
  },
  computed: {
    ...mapGetters({ societes: 'architecture/societe/societes' }),
    records() {
      return this.societes.map((societe) => {
        return {
          nom: societe.nom,
          sigle: societe.sigle,
          siege: societe.siege,
          date: this.$moment(societe.created_at).format('llll'),
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/societe/getOne',
      getSocietes: 'architecture/societe/getAll',
    }),
    imprimer() {
      const columns = ['nom', 'siege', 'sigle', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des societes')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'attention'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
    editer({ id }) {
      this.getOne(id).then(({ societe }) => {
        this.edit.modal = true
        this.edit.societe = societe
        this.$bvModal.show('modalEditSociete')
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
