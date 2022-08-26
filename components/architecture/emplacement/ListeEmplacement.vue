<template>
  <div>
    <b-card aria-hidden="true" header="Liste des emplacements">
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
              @click="$bvModal.show('modalCreateEmplacement')"
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
          :items="emplacements"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun emplacement"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(ordre)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(status)="data">
            <span
              v-for="(status, index) in data.item.statuts"
              :key="index"
              :class="statusClass(status.name)"
            >
              {{ status.name }}
            </span>
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
            modal-id="emplacementConfirmationListe"
            action="architecture/emplacement/supprimer"
            :message="`Voulez vous réelement archiver l'emplacement ${dialogData.nom}`"
          />
        </div>
        <CreateEmplacementModal
          :types="types"
          :zones="zones"
          :marches="marches"
        />
        <div>
          <EditEmplacementModal
            :key="edit.modal"
            v-model="edit.modal"
            :current="edit.emplacement"
            :types="types"
            :zones="zones"
            :marches="marches"
          />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateEmplacementModal from './CreateEmplacementModal.vue'
import EditEmplacementModal from './EditEmplacementModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { EMPLACEMENT } from '~/helper/constantes'
export default {
  components: {
    ConfirmationModal,
    EditEmplacementModal,
    CreateEmplacementModal,
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
    types: {
      type: Array,
      required: true,
    },
    zones: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code', sortable: true },
      { key: 'superficie', label: 'Superficie', sortable: true },
      { key: 'type.nom', label: 'Type', sortable: true },
      { key: 'loyer', label: 'Loyer', tdClass: 'text-right', sortable: true },
      {
        key: 'pas_porte',
        label: 'Pas de porte',
        formatter: (value) => {
          return Number(value)
        },
        tdClass: 'text-right',
        sortable: true,
      },
      {
        key: 'status',
        label: 'Statuts',
        tdClass: 'text-center',
        thClass: 'text-center',
      },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'text-center',
        thClass: 'wd-20p text-center',
        sortable: false,
      },
    ],
    dialogData: { modal: false, id: 0, nom: '' },
    edit: { modal: false, emplacement: {} },
    filter: null,
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.emplacements.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/emplacement/getOne',
    }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('emplacementConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ emplacement }) => {
        this.edit.emplacement = emplacement
        this.edit.modal = true
        this.$bvModal.show('modalEditEmplacement')
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      if (value === EMPLACEMENT.free || value === EMPLACEMENT.unlinked) {
        return 'badge badge-success-light'
      } else {
        return 'badge badge-danger-light'
      }
    },
  },
}
</script>
<style></style>
