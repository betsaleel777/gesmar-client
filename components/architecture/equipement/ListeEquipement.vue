<template>
  <b-card aria-hidden="true" header="Liste des équipements">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-b-tooltip.hover.top
          title="archives"
          class="btn btn-sm btn-primary btn-icon ml-1"
          stroke-width="2"
          size="18"
          type="archive"
          @click="$emit('archivage')"
        />
        <feather
          v-b-tooltip.hover.top
          title="créer"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="plus"
          @click="$bvModal.show('modalCreateEquipement')"
        />
      </div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="search"
        type="search"
        placeholder="Rechercher selon"
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
        :items="equipements.data"
        :fields="fields"
        responsive
        empty-text="Aucun équipement"
        :busy="$fetchState.pending || loading"
        show-empty
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Chargement...</strong>
          </div>
        </template>
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
        <template #cell(status)="data">
          <span :class="statusClass(data.item.abonnement)">
            {{ data.item.abonnement }}
          </span>
          <span :class="statusClass(data.item.liaison)">
            {{ data.item.liaison }}
          </span>
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">
            {{ scope.emptyText }}
          </h6>
        </template>
      </b-table>
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="pages"
        align="right"
        base-url="#"
        size="sm"
        @change="getPage"
      ></b-pagination-nav>
      <div>
        <ConfirmationModal
          :id="dialogData.id"
          :key="dialogData.modal"
          v-model="dialogData.modal"
          :nom="dialogData.nom"
          modal-id="equipementConfirmationListe"
          action="architecture/equipement/supprimer"
          :message="`Voulez vous réelement archiver l'équipement ${dialogData.nom}`"
        />
      </div>
      <CreateEquipementModal :types="types" :marches="marches" />
      <div>
        <EditEquipementModal
          :key="edit.modal"
          v-model="edit.modal"
          :current="edit.equipement"
          :types="types"
          :marches="marches"
        />
      </div>
    </b-card-text>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateEquipementModal from './CreateEquipementModal.vue'
import EditEquipementModal from './EditEquipementModal.vue'
import { EQUIPEMENT } from '~/helper/constantes'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    EditEquipementModal,
    CreateEquipementModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'nom', label: 'Nom', sortable: true },
      { key: 'type', label: 'Type' },
      { key: 'prix_unitaire', label: 'Prix Unitaire', tdClass: 'text-right', sortable: true },
      { key: 'site', label: 'Site' },
      { key: 'status', label: 'Statuts' },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-15p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, equipement: {} },
    search: null,
    pages: 1,
    currentPage: 1,
    loading: false,
  }),
  async fetch() {
    await this.getMarches()
    await this.getTypesEquipement()
    await this.getPaginate()
    this.pageInit()
  },
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
      types: 'architecture/typEquipement/types',
      equipements: 'architecture/equipement/equipements',
    }),
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/equipement/getOne',
      getMarches: 'architecture/marche/getAll',
      getTypesEquipement: 'architecture/typEquipement/getAll',
      getEquipements: 'architecture/equipement/getAll',
    }),
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('equipementConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ equipement }) => {
        this.edit.equipement = equipement
        this.edit.modal = true
        this.$bvModal.show('modalEditEquipement')
      })
    },
    statusClass(value) {
      if (value === EQUIPEMENT.unsubscribed || value === EQUIPEMENT.unlinked) {
        return 'badge badge-success-light'
      } else {
        return 'badge badge-danger-light'
      }
    },
  },
}
</script>
<style></style>
