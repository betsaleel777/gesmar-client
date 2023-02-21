<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <b-card aria-hidden="true" header="Liste des types d'équipements">
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
              @click="$bvModal.show('modalCreateTypequip')"
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
          :items="types"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun type d'équipement"
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
            :nom="dialogData.nom"
            modal-id="typequipConfirmationListe"
            action="architecture/typEquipement/supprimer"
            :message="`Voulez vous réelement archiver le type d'équipement ${dialogData.nom}`"
          />
        </div>
        <CreateTypequipement :marches="marches" />
        <div>
          <EditTypequipement :key="edit.modal" v-model="edit.modal" :current="edit.type" :marches="marches" />
        </div>
      </b-card-text>
    </b-card>
  </b-overlay>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateTypequipement from './CreateTypequipement.vue'
import EditTypequipement from './EditTypequipement.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreateTypequipement,
    EditTypequipement,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'site.nom', label: 'Marché', sortable: true },
      { key: 'caution_abonnement', label: 'Caution' },
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
    edit: { modal: false, type: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getMarches()
    this.getTypesEquipement().then(() => {
      this.totalRows = this.types.length
    })
  },
  computed: {
    ...mapGetters({ types: 'architecture/typEquipement/types', marches: 'architecture/marche/marches' }),
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/typEquipement/getOne',
      getTypesEquipement: 'architecture/typEquipement/getAll',
      getMarches: 'architecture/marche/getAll',
    }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('typequipConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ type }) => {
        this.edit.type = type
        this.edit.modal = true
        this.$bvModal.show('modalEditTypequip')
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
