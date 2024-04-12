<template>
  <b-card aria-hidden="true" header="Termes de contrats pour produits annexes">
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
            @click="$bvModal.show('modalCreateTermeContratAnnexe')"
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
        :items="termes"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun Terme"
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
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(option)="data">
          <a type="button" @click="pdf(data.item)">
            <feather title="pdf" type="file-text" size="20" stroke="indigo" />
          </a>
          <a type="button" @click="dialoger(data.item)">
            <feather title="archiver" type="trash-2" size="20" stroke="red" />
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
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        aria-controls="table"
      ></b-pagination>
      <div>
        <ConfirmationModal
          :id="dialogData.id"
          :key="dialogData.modal"
          v-model="dialogData.modal"
          :nom="dialogData.code"
          modal-id="termeContratAnnexeConfirmationListe"
          action="template/terme-annexe/supprimer"
          :message="`Voulez-vous réelement archiver les termes: '${dialogData.code}'`"
        />
      </div>
      <CreateTermesContratAnnexeModal :marches="marches" />
    </b-card-text>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateTermesContratAnnexeModal from './CreateTermesContratAnnexeModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreateTermesContratAnnexeModal,
  },
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
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
  async fetch() {
    await this.getAll()
    this.totalRows = this.termes.length
  },
  computed: {
    ...mapGetters({ termes: 'template/terme-annexe/termes' }),
  },
  methods: {
    ...mapActions({
      getOne: 'template/terme-annexe/getOne',
      getPdf: 'template/terme-annexe/getPdf',
      getAll: 'template/terme-annexe/getAll',
    }),
    imprimer() {},
    dialoger({ id, code }) {
      this.dialogData.code = code
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('termeContratAnnexeConfirmationListe')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    pdf({ id }) {
      this.getPdf(id).then(({ path }) => {
        window.open(path)
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
