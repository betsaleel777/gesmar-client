<template>
  <b-modal v-model="dialog" size="lg" hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails de facture de loyer</h5>
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
              <span class="tx-sm text-muted">
                fait le: {{ $moment(facture.created_at).format('ll') }} par <b>{{ facture.audit.user.name }}</b>
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
          <div class="card-body">
            <div class="row">
              <div class="col-sm-8 col-lg-8">
                <p class="mg-b-0"><b>Client: </b>{{ facture.personne.alias }}</p>
                <p v-if="facture.personne.contact" class="mg-b-0"><b>Contact: </b>{{ facture.personne.contact }}</p>
              </div>
              <div class="col-sm-4 col-lg-4 text-right">
                <p class="mg-b-0"><b>Code:</b> {{ facture.code }}</p>
                <p class="mg-b-0"><b>Contrat:</b> {{ facture.contrat.code }}</p>
                <p class="mg-b-0">{{ $moment(facture.contrat.debut).format('ll') }} - {{ $moment(facture.contrat.fin).format('ll') }}</p>
              </div>
            </div>
            <div class="table-responsive mt-3">
              <table class="table table-invoice bd-b">
                <thead>
                  <tr>
                    <th class="wd-25p">Code</th>
                    <th class="tx-left">Mois</th>
                    <th class="tx-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tx-left">{{ facture.contrat.emplacement.code }}</td>
                    <td class="tx-left">{{ $moment(facture.periode).format('MMMM YYYY') }}</td>
                    <td class="tx-right">{{ facture.loyer | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row justify-content-between mg-t-25">
              <div class="col-sm-6 col-lg-8 order-2 order-sm-0 mg-t-40 mg-sm-t-0"></div>
              <div class="col-sm-6 col-lg-4 order-1 order-sm-0">
                <ul class="list-unstyled lh-7"></ul>
              </div>
            </div>
          </div>
        </div>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { loyerInvoicePrinter } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    facture: null,
  }),
  async fetch() {
    const { facture } = await this.getOne(this.id)
    this.facture = facture
  },
  computed: {
    ...mapGetters({ societe: MODULES.APPLICATION.GETTERS.SOCIETE, url: MODULES.MEDIA.GETTERS.URL }),
  },
  methods: {
    ...mapActions({
      getOne: MODULES.FACTURE.LOYER.ACTIONS.ONE,
      getSociete: MODULES.APPLICATION.ACTIONS.ONE,
      getUrl: MODULES.MEDIA.ACTIONS.DOWNLOAD,
    }),
    async imprimer() {
      await this.getSociete()
      await this.getUrl(this.societe.logo)
      loyerInvoicePrinter(this.societe, this.facture, this.url)
    },
  },
}
</script>

<style></style>
