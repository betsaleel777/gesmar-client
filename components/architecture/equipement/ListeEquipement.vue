<template>
  <div>
    <b-card aria-hidden="true" header="Liste des équipements">
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
              @click="$bvModal.show('modalCreateEquipement')"
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
          :items="equipements"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun équipement"
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
          <template #cell(status)="data">
            <span :class="statusClass(data.item.status)">{{
              data.item.status
            }}</span>
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
  props: {
    equipements: {
      type: Array,
      required: true,
    },
    types: {
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
      { key: 'type.nom', label: 'Type' },
      { key: 'code', label: 'Code', sortable: true },
      { key: 'nom', label: 'Nom', sortable: true },
      {
        key: 'prix_unitaire',
        label: 'Prix Unitaire',
        tdClass: 'text-right',
        sortable: true,
      },
      { key: 'site.nom', label: 'Site' },
      { key: 'status', label: 'Statut' },
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
    filter: null,
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.equipements.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/equipement/getOne',
    }),
    imprimer() {},
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
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      if (value === EQUIPEMENT.free) {
        return 'badge badge-success-light'
      } else if (value === EQUIPEMENT.busy) {
        return 'badge badge-danger-light'
      } else {
        return 'badge badge-warning-light'
      }
    },
  },
}
</script>
<style></style>
