<template>
  <div>
    <b-card aria-hidden="true" header="Liste des zones">
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
              @click="$bvModal.show('modalCreateZone')"
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
          :items="zones"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucune zone"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(niveau)="data">
            {{ data.item.niveau.nom }}
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
            modal-id="zoneConfirmationListe"
            action="architecture/zone/supprimer"
            :message="`Voulez vous réelement archiver la zone ${dialogData.nom}`"
          />
        </div>
        <CreateZoneModal :niveaux="niveaux" />
        <div>
          <EditZoneModal
            :key="edit.modal"
            v-model="edit.modal"
            :niveaux="niveaux"
            :current="edit.zone"
          />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CreateZoneModal from './CreateZoneModal.vue'
import EditZoneModal from './EditZoneModal.vue'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreateZoneModal,
    EditZoneModal,
  },
  props: {
    zones: {
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
      { key: 'niveau', label: 'Niveaux', sortable: true },
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
    edit: { modal: false, zone: {} },
    filter: null,
    currentPage: 1,
    perPage: 10,
  }),
  computed: {
    totalRows() {
      return this.zones.length
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/zone/getOne',
    }),
    imprimer() {},
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('zoneConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ zone }) => {
        this.edit.zone = zone
        this.edit.modal = true
        this.$bvModal.show('modalEditZone')
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
