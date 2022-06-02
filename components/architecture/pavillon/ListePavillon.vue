<template>
  <div>
    <b-card aria-hidden="true" header="Liste des pavillons">
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
              @click="$bvModal.show('modalCreatePavillon')"
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
          :items="pavillons"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun Pavillon"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(marche)="data">
            {{ data.item.site.nom }}
          </template>
          <template #cell(created_at)="data">
            {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
          </template>
          <template #cell(option)="data">
            <a type="button" @click="editer(data.item)">
              <feather title="modifier" type="edit" size="20" stroke="blue" />
            </a>
            <a type="button" @click="dialoger(data.item)">
              <feather title="archiver" type="trash-2" size="20" stroke="red" />
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
        <div>
          <ConfirmationModal
            :id="dialogData.id"
            :key="dialogData.modal"
            v-model="dialogData.modal"
            :nom="dialogData.nom"
            modal-id="pavillonConfirmationListe"
            action="architecture/pavillon/supprimer"
            :message="`Voulez vous réelement archiver le pavillon ${dialogData.nom}`"
          />
        </div>
        <CreatePavillonModal :marches="marches" />
        <div>
          <EditPavillonModal
            :key="edit.modal"
            v-model="edit.modal"
            :marches="marches"
            :current="edit.pavillon"
          />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreatePavillonModal from './CreatePavillonModal.vue'
import EditPavillonModal from './EditPavillonModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreatePavillonModal,
    EditPavillonModal,
  },
  props: {
    marches: {
      type: Array,
      required: true,
    },
    pavillons: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'marche', label: 'Site', sortable: true },
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
    edit: { modal: false, pavillon: {} },
    filter: null,
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.pavillons.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/pavillon/getOne',
    }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('pavillonConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ pavillon }) => {
        this.edit.pavillon = pavillon
        this.edit.modal = true
        this.$bvModal.show('modalEditPavillon')
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
