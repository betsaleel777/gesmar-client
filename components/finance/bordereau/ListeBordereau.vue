<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
      <b-card aria-hidden="true" header="Liste des bordereaux">
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
                @click="$bvModal.show('modalCreateBordereaux')"
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
            :items="bordereaux"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            responsive
            empty-text="Tableau vide"
            show-empty
            :filter="filter"
            @filtered="onFiltered"
          >
            <template #cell(ordre)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(created_at)="data">
              {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
            </template>
            <template #cell(option)="data">
              <a type="button" @click="details(data.item)">
                <feather title="visualiser" type="eye" size="20" stroke="indigo" />
              </a>
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
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
            size="sm"
            aria-controls="table"
          ></b-pagination>
          <EditBordereauModal v-if="edit.modal" v-model="edit.modal" :current="edit.bordereau" />
          <ShowBordereauModal v-if="show.modal" v-model="show.modal" :bordereau="show.bordereau" />
          <CreateBordereauModal />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import EditBordereauModal from './EditBordereauModal.vue'
import ShowBordereauModal from './ShowBordereauModal.vue'
import CreateBordereauModal from './CreateBordereauModal.vue'
export default {
  components: {
    EditBordereauModal,
    ShowBordereauModal,
    CreateBordereauModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'user.name', label: 'Nom', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-20p text-center',
        sortable: false,
      },
    ],
    edit: { modal: false, bordereau: {} },
    show: { modal: false, bordereau: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getAll().then(() => this.bordereaux.length)
  },
  computed: {
    ...mapGetters('finance/bordereau', ['bordereaux']),
  },
  methods: {
    ...mapActions({
      getAll: 'finance/bordereau/getAll',
      getOne: 'finance/bordereau/getOne',
    }),
    imprimer() {},
    details({ id }) {
      this.getOne(id).then(({ bordereau }) => {
        this.show.bordereau = bordereau
        this.show.modal = true
      })
    },
    editer({ id }) {
      this.getOne(id).then(({ bordereau }) => {
        this.edit.bordereau = bordereau
        this.edit.modal = true
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
