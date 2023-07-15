<template>
  <b-modal v-model="dialog" scrollable hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Encaissement {{ encaissement.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <div class="card card-invoice">
        <div class="card-header">
          <div>
            <span class="tx-sm text-muted">
              fait le: {{ $moment(encaissement.created_at).format('ll') }} par {{ encaissement.caissier }}
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
        <!-- card-header -->
        <div class="card-body">
          <div class="row">
            <div class="col-sm-7 col-lg-7">
              <h6 class="tx-15 mg-b-10">Paiement par: {{ encaissement.type }}</h6>
              <p class="mg-b-0">Guichet: {{ encaissement.guichet }}</p>
            </div>
            <!-- <div class="col-sm-5 col-lg-5">
              <h6 class="tx-15 mg-b-10">patati</h6>
              <p class="mg-b-0">patatat</p>
            </div> -->
          </div>
          <!-- row -->
          <div class="table-responsive mt-3">
            <table class="table table-invoice bd-b">
              <thead>
                <tr>
                  <th class="wd-30p">Emplacement</th>
                  <th class="wd-20p">Montant</th>
                  <th class="wd-20p">Versement</th>
                  <th class="tx-right">Monnaie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tx-nowrap">{{ encaissement.emplacement }}</td>
                  <td class="tx-nowrap">{{ encaissement.payable.montant | currency }}</td>
                  <td class="tx-nowrap">{{ encaissement.payable.versement | currency }}</td>
                  <td class="tx-right">
                    {{ (encaissement.payable.versement - encaissement.payable.montant) | currency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="row justify-content-between mg-t-25">
            <div class="col-sm-6 col-lg-6 order-2 order-sm-0 mg-t-40 mg-sm-t-0"></div>
            <div class="col-sm-6 col-lg-6 order-1 order-sm-0">
              <ul class="list-unstyled lh-7 pd-r-10">
                <li class="d-flex justify-content-between">
                  <span>Sub-Total</span>
                  <span>0</span>
                </li>
              </ul>
            </div>
          </div> -->
        </div>
        <!-- card-body -->
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { invoicePrinter } from '~/helper/helpers'
export default {
  props: {
    encaissement: {
      type: Object,
      required: true,
    },
    value: Boolean,
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
    ...mapGetters({ societe: 'architecture/application/societe' }),
  },
  methods: {
    ...mapActions({ getOne: 'architecture/application/getOne' }),
    async imprimer() {
      await this.getOne()
      invoicePrinter(this.societe, this.encaissement)
    },
  },
}
</script>

<style></style>
