<template>
  <div>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          En chargement ...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <b-card aria-hidden="true" header="Liste des caissiers">
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
              @click="$bvModal.show('modalCreateCaissier')"
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
          :items="caissiers"
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
            <a type="button" class="mr-1" @click="details(data.item)">
              <feather title="visualiser" type="eye" size="20" stroke="indigo" />
            </a>
            <a type="button" class="mr-1" @click="attribuer(data.item)">
              <feather title="attribuer" type="calendar" size="20" stroke="green" />
            </a>
            <nuxt-link :to="`/parametre/utilisateur/${data.item.user.id}/settings`">
              <feather title="modifier" type="edit" size="20" stroke="blue" />
            </nuxt-link>
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
        <CreateCaissierModal />
        <AttribuerGuichetModal
          v-if="attribution.modal"
          v-model="attribution.modal"
          :caissier="attribution.caissier"
        />
        <ShowCaissierModal v-if="show.modal" v-model="show.modal" :caissier="show.caissier" />
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ShowCaissierModal from './ShowCaissierModal.vue'
import CreateCaissierModal from './CreateCaissierModal.vue'
import AttribuerGuichetModal from './AttribuerGuichetModal.vue'
export default {
  components: {
    AttribuerGuichetModal,
    ShowCaissierModal,
    CreateCaissierModal,
  },
  data: () => ({
    loading: false,
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'user.name', label: 'Nom', sortable: true },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    edit: { modal: false, caissier: {} },
    show: { modal: false, caissier: {} },
    attribution: { modal: false, caissier: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getAll().then(() => {
      this.totalRows = this.caissiers.length
    })
  },
  computed: {
    ...mapGetters('caisse/caissier', ['caissiers']),
  },
  methods: {
    ...mapActions({
      getAll: 'caisse/caissier/getAll',
      getOne: 'caisse/caissier/getOne',
    }),
    imprimer() {},
    details({ id }) {
      this.loading = true
      this.getOne(id).then(({ caissier }) => {
        this.show.caissier = caissier
        this.show.modal = true
        this.loading = false
      })
    },
    attribuer({ id }) {
      this.getOne(id).then(({ caissier }) => {
        this.attribution.caissier = caissier
        this.attribution.modal = true
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
