<template>
  <b-modal v-model="dialog" hide-footer size="lg">
    <template #modal-header>
      <h5 class="modal-title text-primary">Facture initiale</h5>
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
            <span class="tx-sm text-muted"
              >fait le: {{ $moment(facture.created_at).format('ll') }} par <b>{{ facture.audit.user.name }}</b></span
            >
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
                <p class="mg-b-0"><b>Client: </b>{{ facture.personne.fullname.toUpperCase() }}</p>
                <p class="mg-b-0"><b>Emplacement: </b>{{ facture.contrat.emplacement.code }}</p>
                <p class="mg-b-0"><b>Type: </b>{{ facture.contrat.emplacement.type.nom }}</p>
              </div>
              <div class="col-sm-4 col-lg-4 text-right">
                <p class="mg-b-0">
                  Code Facture: <b>{{ facture.code }}</b>
                </p>
                <p class="mg-b-0">
                  Code du contrat: <b>{{ facture.contrat.code }}</b>
                </p>
                <p class="mg-b-0">{{ $moment(facture.contrat.debut).format('DD-MM-YYYY') }} - {{ $moment(facture.contrat.fin).format('DD-MM-YYYY') }}</p>
              </div>
            </div>
            <div class="table-responsive mt-3">
              <table class="table bd-b">
                <thead>
                  <tr>
                    <th class="tx-left">Pas de Porte</th>
                    <th class="tx-left">Frais de dossier</th>
                    <th class="tx-left">Frais d'amenagement</th>
                    <th class="tx-left">Caution</th>
                    <th class="tx-left">Avance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tx-left">{{ facture.pas_porte | currency }}</td>
                    <td class="tx-left">{{ facture.frais_dossier | currency }}</td>
                    <td class="tx-left">{{ facture.frais_amenagement | currency }}</td>
                    <td class="tx-left">{{ facture.caution | currency }}</td>
                    <td class="tx-left">{{ facture.avance | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row justify-content-between mg-t-25">
              <div class="col-sm-6 col-lg-8 order-2 order-sm-0 mg-t-40 mg-sm-t-0"></div>
              <div class="col-sm-6 col-lg-4 order-1 order-sm-0">
                <ul class="list-unstyled lh-7">
                  <li class="d-flex justify-content-between">
                    <span>Montant versé:</span>
                    <span>{{ facture.sommeVersee | currency }}</span>
                  </li>
                  <li class="d-flex justify-content-between">
                    <span>Reste à payer:</span>
                    <span
                      ><b>{{ reste | currency }}</b></span
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
import { mapActions, mapGetters } from 'vuex'
import { initialeInvoicePrinter } from '~/helper/helpers'
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
    reste() {
      return this.facture.total - this.facture.sommeVersee
    },
  },
  methods: {
    ...mapActions({
      getOne: MODULES.FACTURE.INITIALE.ACTIONS.ONE,
      getSociete: MODULES.APPLICATION.ACTIONS.ONE,
      getUrl: MODULES.MEDIA.ACTIONS.DOWNLOAD,
    }),
    async imprimer() {
      await this.getSociete()
      await this.getUrl(this.societe.logo)
      initialeInvoicePrinter(this.societe, this.facture, this.url)
    },
  },
}
</script>

<style></style>
