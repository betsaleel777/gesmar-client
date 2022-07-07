<template>
  <b-card
    aria-hidden="true"
    header="Termes de contrats pour emplacements (bails)"
  >
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
            @click="$bvModal.show('modalCreateTermeContratBail')"
          />
          <feather
            v-b-tooltip.hover.top
            title="imprimer liste"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="printer"
          />
          <feather
            v-b-tooltip.hover.top
            title="archives"
            class="btn btn-sm btn-primary btn-icon"
            stroke-width="2"
            size="18"
            type="archive"
            @click="$emit('archivage')"
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
        :items="termes"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun Terme"
        show-empty
        :filter="filter"
        @filtered="onFiltered"
      >
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(option)="data">
          <a type="button" @click="editer(data.item)">
            <feather title="modifier" type="edit" size="20" stroke="blue" />
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
        v-if="totalRows > 0"
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
          modal-id="termeContratBailConfirmationListe"
          action="template/terme-bail/supprimer"
          :message="`Voulez-vous réelement archiver les termes: '${dialogData.code}'`"
        />
      </div>
      <CreateTermeContratBailModal :marches="marches" />
    </b-card-text>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'
import CreateTermeContratBailModal from './CreateTermeContratBailModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreateTermeContratBailModal,
  },
  props: {
    termes: {
      type: Array,
      required: true,
    },
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
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.termes.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'template/terme-bail/getOne',
    }),
    imprimer() {},
    dialoger({ id, code }) {
      this.dialogData.code = code
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('termeContratBailConfirmationListe')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
