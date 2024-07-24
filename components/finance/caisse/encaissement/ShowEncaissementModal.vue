<template>
  <b-modal v-model="dialog" size="lg" scrollable hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails d'encaissement</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true">
          <feather type="x" />
        </span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <div v-if="!$fetchState.pending" class="card card-invoice">
          <div class="card-header">
            <div>
              <span v-if="encaissement.caissier" class="tx-sm text-muted">
                fait le: {{ encaissement.created_at }} par <b>{{ encaissement.caissier.user.name }}</b>
              </span>
            </div>
            <div class="btn-group-invoice">
              <button class="btn btn-white btn-sm btn-uppercase" @click="imprimer">
                <feather type="printer" size="20" stroke="blue" />
              </button>
              <button class="btn btn-white btn-sm btn-uppercase">
                <feather type="mail" size="20" stroke="blue" />
              </button>
            </div>
          </div>
          <div v-if="encaissement" class="card-body">
            <div class="row">
              <div v-if="encaissement.ouverture" class="col-sm-7 col-lg-7">
                <h6 class="tx-15 mg-b-10">
                  Emplacement: {{ encaissement.ordonnancement.emplacement.type.nom }}-{{ encaissement.ordonnancement.emplacement.code }}
                </h6>
                <p class="mg-b-0"><b>Client:</b> {{ encaissement.ordonnancement.personne.alias }}</p>
                <p class="mg-b-0"><b>Guichet:</b> {{ encaissement.ouverture.guichet.nom }}</p>
                <p class="mg-b-0"><b>Nature opération:</b> {{ encaissement.type }}</p>
              </div>
              <div class="col-sm-5 col-lg-5 text-right">
                <h6 class="tx-15 mg-b-10">A PAYER: {{ encaissement.ordonnancement.total | currency }}</h6>
                <p class="mg-b-0"><b>Code: </b>{{ encaissement.code }}</p>
                <p class="mg-b-0"><b>Contrat: </b>{{ encaissement.ordonnancement.contrat.code }}</p>
              </div>
            </div>
            <div v-if="encaissement.bordereau" class="table-responsive mt-3">
              <table class="table bd-b">
                <thead>
                  <tr>
                    <th class="wd-30p">
                      <span v-if="encaissement.bordereau">Bordereau</span>
                      <span v-else>Emplacement</span>
                    </th>
                    <th class="wd-20p">Montant</th>
                    <th class="wd-20p">Versement</th>
                    <th class="tx-right">Monnaie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tx-nowrap">
                      <span v-if="encaissement.bordereau">{{ encaissement.bordereau.code }}</span>
                      <span v-else>{{ produitName }}</span>
                    </td>
                    <td class="tx-nowrap">{{ encaissement.payable.montant | currency }}</td>
                    <td class="tx-nowrap">{{ encaissement.payable.versement | currency }}</td>
                    <td class="tx-right">
                      {{ (encaissement.payable.versement - encaissement.payable.montant) | currency }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="table-responsive mt-3">
              <table class="table table-invoice bd-b">
                <thead>
                  <tr>
                    <th class="wd-20p">Code Facture</th>
                    <th class="tx-left">Mois</th>
                    <th class="tx-left">Type</th>
                    <th class="tx-center">Statut</th>
                    <th class="tx-right">Montant (FCFA)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(paiement, index) in encaissement.ordonnancement.paiements" :key="index">
                    <td class="tx-nowrap">{{ paiement.facture.code }}</td>
                    <td v-if="paiement.facture.periode" class="tx-left">
                      {{ $moment(paiement.facture.periode).format('MMMM YYYY') }}
                    </td>
                    <td v-else class="tx-left">Aucun</td>
                    <td class="tx-left">{{ paiement.facture.type }}</td>
                    <td class="tx-center">
                      <span :class="statusClass(paiement.facture.status)">{{ paiement.facture.status }}</span>
                    </td>
                    <td class="tx-right">{{ paiement.montant | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row justify-content-between mg-t-25">
              <div class="col-sm-8 col-lg-8 order-2 order-sm-0 mg-t-40 mg-sm-t-0"></div>
              <div class="col-sm-4 col-lg-4 order-1 order-sm-0">
                <ul class="list-unstyled lh-7">
                  <li class="d-flex justify-content-between">
                    <span>Montant versé:</span>
                    <span>{{ encaissement.payable.versement | currency }}</span>
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Monnaie rendue:</span>
                    <span>{{ (encaissement.payable.versement - encaissement.payable.montant) | currency }}</span>
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
import { FACTURE } from '~/helper/constantes'
import { invoicePrinter } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: { id: { type: Number, required: true } },
  data() {
    return { encaissement: { code: null } }
  },
  async fetch() {
    const { encaissement } = await this.getEncaissement(this.id)
    this.encaissement = encaissement
  },
  computed: {
    ...mapGetters({ societe: MODULES.APPLICATION.GETTERS.SOCIETE, url: MODULES.MEDIA.GETTERS.URL }),
    produitName() {
      if (this.encaissement.ordonnancement.emplacement) return this.encaissement.ordonnancement.emplacement.code
      else return this.encaissement.ordonnancement.annexe.nom
    },
  },
  methods: {
    ...mapActions({
      getSociete: MODULES.APPLICATION.ACTIONS.ONE,
      getEncaissement: MODULES.ENCAISSEMENT.ACTIONS.ONE,
      getUrl: MODULES.MEDIA.ACTIONS.DOWNLOAD,
    }),
    async imprimer() {
      await this.getSociete()
      await this.getUrl(this.societe.logo)
      invoicePrinter(this.societe, this.encaissement, this.url)
    },
    statusClass(value) {
      const classes = {
        [FACTURE.status.facture]: 'badge badge-warning-light',
        [FACTURE.status.paid]: 'badge badge-success-light',
        [FACTURE.status.unpaid]: 'badge badge-danger-light',
        [FACTURE.status.proforma]: 'badge badge-primary-light',
      }
      return classes[value]
    },
  },
}
</script>

<style></style>
