<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
      <b-card aria-hidden="true" header="Liste des commerciaux">
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
                @click="$bvModal.show('modalCreateCommercial')"
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
            :items="commerciaux"
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
              <a type="button" @click="attribuer(data.item)">
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
            v-if="totalRows > 0"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
            size="sm"
            aria-controls="table"
          ></b-pagination>
          <CreateCommecialModal />
          <AttribuerBordereauModal
            v-if="attribution.modal"
            v-model="attribution.modal"
            :commercial="attribution.commercial"
          />
          <ShowAttributionBordereauModal
            v-if="show.modal"
            v-model="show.modal"
            :commercial="show.commercial"
          />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateCommecialModal from './CreateCommecialModal.vue'
import AttribuerBordereauModal from './AttribuerBordereauModal.vue'
import ShowAttributionBordereauModal from './ShowAttributionBordereauModal.vue'
export default {
  components: {
    CreateCommecialModal,
    AttribuerBordereauModal,
    ShowAttributionBordereauModal,
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
    edit: { modal: false, commercial: {} },
    show: { modal: false, commercial: {} },
    attribution: { modal: false, commercial: {} },
    filter: null,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getAll()
  },
  computed: {
    ...mapGetters('finance/commercial', ['commerciaux']),
    totalRows() {
      return this.commerciaux.length
    },
  },
  methods: {
    ...mapActions({
      getAll: 'finance/commercial/getAll',
      getOne: 'finance/commercial/getOne',
    }),
    imprimer() {},
    details({ id }) {
      this.getOne(id).then(({ commercial }) => {
        this.show.commercial = commercial
        this.show.modal = true
      })
    },
    editer({ id }) {
      this.getOne(id).then(({ commercial }) => {
        this.edit.commercial = commercial
        this.edit.modal = true
      })
    },
    attribuer(commercial) {
      this.attribution.commercial = commercial
      this.attribution.modal = true
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
