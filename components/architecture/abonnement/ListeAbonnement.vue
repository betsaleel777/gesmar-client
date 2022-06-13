<template>
  <div>
    <b-overlay :show="$fetchState.pending" rounded="sm">
      <b-card aria-hidden="true" header="Liste des abonnements">
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
                @click="$bvModal.show('modalCreateAbonnement')"
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
            :items="abonnements"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            responsive
            empty-text="Aucun abonnement"
            show-empty
            :filter="filter"
            @filtered="onFiltered"
          >
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
              modal-id="abonnementConfirmationListe"
              action="architecture/abonnement/supprimer"
              :message="`Voulez vous réelement archiver l'abonnement ${dialogData.code}`"
            />
          </div>
          <CreateAbonnementModal
            :equipements="equipements"
            :emplacements="emplacements"
            :marches="marches"
          />
          <!-- <div>
            <EditAbonnementModal
              :key="edit.modal"
              v-model="edit.modal"
              :current="edit.abonnement"
              :equipements="equipements"
              :emplacements="emplacements"
              :marches="marches"
            />
          </div> -->
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateAbonnementModal from './CreateAbonnementModal.vue'
// import EditAbonnementModal from './EditAbonnementModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreateAbonnementModal,
    // EditAbonnementModal,
  },
  props: {
    marches: {
      type: Array,
      required: true,
    },
    emplacements: {
      type: Array,
      required: true,
    },
    equipements: {
      type: Array,
      required: true,
    },
    abonnements: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      { key: 'code', label: 'Code', sortable: true },
      { key: 'superficie', label: 'Superficie', sortable: true },
      { key: 'equipement.code', label: 'Equipement', sortable: true },
      { key: 'emplacement.code', label: 'Emplacement', sortable: true },
      { key: 'index_depart', label: 'Index', sortable: true },
      { key: 'status', label: 'Statut', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-20p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, code: '' },
    edit: { modal: false, abonnement: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.totalRows = this.abonnements.length
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/abonnement/getOne',
    }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('abonnementConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ abonnement }) => {
        this.edit.abonnement = abonnement
        this.edit.modal = true
        this.$bvModal.show('modalEditAbonnement')
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
