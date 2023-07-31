<template>
  <b-modal v-model="dialog" size="xl" scrollable hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails du point de caisse</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <div v-if="fermeture" class="card card-invoice">
          <div class="card-header">
            <div>
              <span class="tx-sm text-muted">
                Fait le {{ fermeture.created_at }} par <b>{{ fermeture.caissier }}</b>
              </span>
            </div>
            <div class="btn-group-invoice">
              <feather
                class="btn btn-sm btn-light btn-icon"
                type="printer"
                size="20"
                stroke="blue"
                @click="imprimer"
              />
              <feather
                class="btn btn-sm btn-light btn-icon"
                type="check-circle"
                size="20"
                stroke="blue"
                @click="confirmDialog = true"
              />
            </div>
          </div>
          <!-- card-header -->
          <div class="card-body">
            <div class="table-responsive">
              <b-form-input
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
                :items="fermeture.encaissements"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                responsive
                empty-text="Aucun Encaissement"
                show-empty
                :filter="filter"
                @filtered="onFiltered"
              >
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
                align="left"
                size="sm"
                class="mt-1"
                aria-controls="table"
              ></b-pagination>
            </div>
            <div class="row justify-content-between mg-t-25">
              <div class="col-sm-6 col-lg-6 order-2 order-sm-0 mg-t-40 mg-sm-t-0">
                <!-- si la fermeture est confirmé -->
                <!-- <li class="d-flex justify-content-between">
                    <strong>Relicat</strong>
                    <strong>0</strong>
                  </li> -->
              </div>
              <div class="col-sm-6 col-lg-6 order-1 order-sm-0">
                <ul class="list-unstyled lh-7 pd-r-10">
                  <li class="d-flex justify-content-between">
                    <span>Total des transactions espèce</span>
                    <span>{{ totalEspece | currency }}</span>
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Total des transactions cheque</span>
                    <span>{{ totalCheque | currency }}</span>
                  </li>
                  <hr class="my-0" />
                  <li class="d-flex justify-content-between">
                    <span>Total des transactions</span>
                    <span>{{ (totalEspece + totalCheque) | currency }}</span>
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Montant initial en caisse</span>
                    <span>{{ fermeture.initial | currency }}</span>
                  </li>
                  <hr class="my-0" />
                  <li class="d-flex justify-content-between">
                    <span><b>Total</b></span>
                    <span
                      ><b>{{ (fermeture.initial + totalEspece + totalCheque) | currency }}</b></span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ENCAISSEMENT } from '~/helper/constantes'
import { caissePointPrinter } from '~/helper/helpers'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    confirmDialog: false,
    fields: [
      { key: 'type', label: 'Mode de paiement' },
      {
        key: 'montant',
        label: 'Montant à payer',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.payable.montant : item.payable.valeur
        },
      },
      {
        key: 'versement',
        label: 'Montant versé',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.payable.versement : item.payable.valeur
        },
      },
      {
        key: 'monnaie',
        label: 'Monnaie',
        formatter: (value, key, item) => {
          return item.type === 'Espece' ? item.payable.versement - item.payable.montant : 0
        },
      },
      { key: 'created_at', label: 'Date', sortable: true },
    ],
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getOne(this.id)
    this.totalRows = this.fermeture.encaissements.length
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    totalEspece() {
      let total = 0
      this.fermeture.encaissements.forEach((encaissement) => {
        if (encaissement.type === ENCAISSEMENT.type.espece) total += encaissement.payable.montant
      })
      return total
    },
    totalCheque() {
      let total = 0
      this.fermeture.encaissements.forEach((encaissement) => {
        if (encaissement.type === ENCAISSEMENT.type.cheque) total += encaissement.payable.valeur
      })
      return total
    },
    ...mapGetters({ fermeture: 'caisse/fermeture/fermeture', societe: 'architecture/application/societe' }),
  },
  methods: {
    ...mapActions({ getOne: 'caisse/fermeture/getOne', getSociete: 'architecture/application/getOne' }),
    imprimer() {
      const infos = {
        ...this.fermeture,
        totalCheque: this.totalCheque,
        totalEspece: this.totalEspece,
        totalTransaction: this.totalCheque + this.totalEspece,
        total: this.totalCheque + this.totalEspece + this.fermeture.initial,
      }
      this.getSociete().then(() => caissePointPrinter(this.societe, infos))
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style scoped></style>
