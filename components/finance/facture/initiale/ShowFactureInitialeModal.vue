<template>
  <b-modal v-model="dialog" hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Facture initiale {{ facture.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <div v-if="!$fetchState.pending" class="card card-invoice">
          <div class="card-header">
            <div>
              <span class="tx-sm text-muted">fait le: {{ $moment(facture.created_at).format('ll') }}</span>
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
          <div ref="toprint" class="card-body">
            <div class="row">
              <div class="col-sm-7 col-lg-7">
                <h6 class="tx-15 mg-b-10">Produit: {{ produit }}</h6>
                <p class="mg-b-0">{{ ordonnancement.personne.fullname }}</p>
              </div>
              <div class="col-sm-5 col-lg-5">
                <h6 class="tx-15 mg-b-10">A PAYER: {{ facture.total | currency }}</h6>
                <p class="mg-b-0">{{ facture.code }}</p>
              </div>
            </div>
            <h5 class="mg-t-25">Paiements</h5>
            <div class="table-responsive">
              <table class="table table-invoice bd-b">
                <thead>
                  <tr>
                    <th class="wd-30p">Code Facture</th>
                    <th class="tx-right">Montant (FCFA)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(paiement, index) in ordonnancement.paiements" :key="index">
                    <td class="tx-nowrap">{{ paiement.facture.code }}</td>
                    <td class="tx-right">{{ paiement.montant | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row justify-content-between mg-t-25">
              <div class="col-sm-6 col-lg-6 order-2 order-sm-0 mg-t-40 mg-sm-t-0"></div>
              <div class="col-sm-6 col-lg-6 order-1 order-sm-0">
                <ul class="list-unstyled lh-7 pd-r-10">
                  <li class="d-flex justify-content-between">
                    <span>Sub-Total</span>
                    <span>{{ totalVerse | currency }}</span>
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
import { mapActions } from 'vuex'
import { errorHandling } from '~/helper/helpers'
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
    submiting: false,
    facture: {
      id: null,
      code: null,
      pas_porte: null,
      avance: null,
      caution: null,
    },
    errors: {
      pas_porte: { exist: false, message: null },
      avance: { exist: false, message: null },
      caution: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { facture } = await this.getOne(this.id)
    this.facture = facture
  },
  methods: {
    ...mapActions({ getOne: 'facture/initiale/getOne', modifier: 'facture/initiale/modifier' }),
    save() {
      this.submiting = true
      this.modifier(this.facture)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>

<style></style>
