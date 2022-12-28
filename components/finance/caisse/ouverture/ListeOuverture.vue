<template>
  <div>
    <b-card aria-hidden="true" header="Liste des Ouvertures de Caisse">
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
              @click="$bvModal.show('modalCreateOuverture')"
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
          :items="ouvertures"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucune Ouverture de caisse"
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
        <CreateOuvertureModal :ouvertures="ouvertures" />
        <EditOuvertureModal v-if="edit.modal" v-model="edit.modal" :current="edit.EditOuvertureModal" />
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateOuvertureModal from './CreateOuvertureModal.vue'
import EditOuvertureModal from './EditOuvertureModal.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    CreateOuvertureModal,
    EditOuvertureModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'code', label: 'Code' },
      { key: 'guichet.site.nom', label: 'Marché' },
      { key: 'caissier.user.name', label: 'Caissier' },
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
    edit: { modal: false, ouverture: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getAll().then(() => {
      this.totalRows = this.ouvertures.length
    })
  },
  computed: {
    ...mapGetters({ ouvertures: 'caisse/ouverture/ouvertures' }),
    records() {
      return this.ouvertures.map((ouverture) => {
        return {
          code: ouverture.code,
          site: ouverture.guichet.site.nom,
          caissier: ouverture.caissier.user.name,
          date: this.$moment(ouverture.created_at).format('llll'),
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getAll: 'caisse/ouverture/getAll',
      getOne: 'caisse/ouverture/getOne',
    }),
    imprimer() {
      const columns = ['code', 'site', 'caissier', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des ouvertures')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'information'.toLocaleUpperCase(),
          variant: 'info',
          solid: true,
        })
    },
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('ouvertureConfirmationListe')
    },
    editer({ id }) {
      this.getOne(id).then(({ ouverture }) => {
        this.edit.modal = true
        this.edit.ouverture = ouverture
        this.$bvModal.show('modalEditOuverture')
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
