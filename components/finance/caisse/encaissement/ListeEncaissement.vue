<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <b-card aria-hidden="true" header="Liste encaissements">
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
              @click="dialog = true"
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
              title="fermer"
              class="btn btn-sm btn-primary btn-icon"
              stroke-width="2"
              size="18"
              type="x-square"
              @click="fermer"
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
          :items="encaissements"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Aucun Encaissement"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(ordre)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(option)="data">
            <a type="button" @click="detail(data.item)">
              <feather title="eye" type="eye" size="20" stroke="indigo" />
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
        <CreateEncaissement v-model="dialog" />
        <ShowEncaissementModal v-if="show.modal" v-model="show.modal" :current="show.encaissement" />
      </b-card-text>
    </b-card>
  </b-overlay>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateEncaissement from './CreateEncaissement.vue'
import ShowEncaissementModal from './ShowEncaissementModal.vue'
import { capitalize, arrayPdf } from '~/helper/helpers'
export default {
  components: {
    CreateEncaissement,
    ShowEncaissementModal,
  },
  data: () => ({
    fields: [
      'ordre',
      { key: 'ordonnancement', label: 'Code' },
      { key: 'caissier', label: 'Caissier' },
      { key: 'type', label: 'Payement' },
      {
        key: 'montant',
        label: 'Montant à payer',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.montant : item.valeur
        },
      },
      {
        key: 'versement',
        label: 'Montant versé',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.versement : item.valeur
        },
      },
      {
        key: 'monnaie',
        label: 'Monnaie',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.versement - item.montant : 0
        },
      },
      { key: 'created_at', label: 'Crée le', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    dialog: false,
    dialogData: { modal: false, id: 0, nom: '' },
    show: { modal: false, encaissement: {} },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  fetch() {
    this.getEncaissements().then(() => {
      this.totalRows = this.encaissements.length
    })
  },
  computed: {
    ...mapGetters({ encaissements: 'caisse/encaissement/encaissements' }),
    records() {
      return this.encaissements.map((encaissement) => {
        return {
          code: encaissement.ordonnancement,
          caissier: encaissement.caissier,
          date: this.$moment(encaissement.created_at).format('llll'),
        }
      })
    },
  },
  methods: {
    ...mapActions({
      getEncaissements: 'caisse/encaissement/getAll',
      getOne: 'caisse/encaissement/getOne',
    }),
    imprimer() {
      const columns = ['code', 'caissier', 'date']
      const cols = columns.map((elt) => {
        return { header: capitalize(elt), dataKey: elt }
      })
      if (this.records.length > 0) arrayPdf(cols, this.records, 'liste des encaissements')
      else
        this.$bvToast.toast('Cette action est impossible car la liste est vide', {
          title: 'attention'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
    fermer() {
      this.$bvModal
        .msgBoxOk('Voulez vous réelement fermer la caisse pour ce jour?', {
          title: 'Confirmer la fermeture de caisse',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'primary',
          footerClass: 'p-2 border-top-0',
          centered: true,
        })
        .then((value) => {})
    },
    dialoger({ id, nom }) {
      this.dialogData.nom = nom
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('encaissementConfirmationListe')
    },
    detail({ id }) {
      this.getOne(id).then(({ encaissement }) => {
        this.show.modal = true
        this.show.encaissement = encaissement
        this.$bvModal.show('modalShowEncaissement')
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
