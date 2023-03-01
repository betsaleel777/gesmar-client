<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
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
              @click="imprimer"
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
  </b-overlay>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateEquipementModal from './CreateEquipementModal.vue'
import EditEquipementModal from './EditEquipementModal.vue'
import { EQUIPEMENT } from '~/helper/constantes'
import ConfirmationModal from '~/components/tools/ConfirmationModal.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    ConfirmationModal,
    EditEquipementModal,
    CreateEquipementModal,
  },
  data: () => ({
    fields: [
      'ordre',
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
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getMarches()
    this.getTypesEquipement()
    this.getEquipements().then(() => {
      this.totalRows = this.equipements.length
    })
  },
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
      types: 'architecture/typEquipement/types',
      equipements: 'architecture/equipement/equipements',
    }),
    records() {
      return this.equipements.map((gear) => {
        return {
          code: gear.code,
          prix: this.$options.filters.currency(gear.prix_unitaire),
          type: gear.type.nom,
          site: gear.site.nom,
          date: this.$moment(gear.created_at).format('llll'),
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/equipement/getOne',
      getMarches: 'architecture/marche/getAll',
      getTypesEquipement: 'architecture/typEquipement/getAll',
      getEquipements: 'architecture/equipement/getAll',
    }),
    imprimer() {
      const columns = ['code', 'type', 'prix', 'site', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des equipements')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'attention'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
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
