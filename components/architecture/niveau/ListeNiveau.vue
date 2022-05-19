<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
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
            <template #cell(pavillon)="data">
              {{ data.item.pavillon.nom }}
            </template>
            <template #cell(created_at)="data">
              {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
            </template>
            <template #cell(option)="data">
              <a type="button" @click="editer(data.item)">
                <feather title="modifier" type="edit" size="20" stroke="blue" />
              </a>
              <a type="button" @click="dialoger(data.item)">
                <feather
                  title="archiver"
                  type="trash-2"
                  size="20"
                  stroke="red"
                />
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
              modal-id="niveauConfirmationListe"
              action="architecture/niveau/supprimer"
              :message="`Voulez vous réelement archiver le niveau ${dialogData.nom}`"
            />
          </div>
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
    </b-overlay>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateNiveauModal from './CreateNiveauModal.vue'
import EditNiveauModal from './EditNiveauModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
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
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'pavillon', label: 'Pavillon', sortable: true },
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
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.totalRows = this.niveaux.length
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
