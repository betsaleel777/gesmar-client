<template>
  <b-modal v-model="dialog" scrollable hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Encaissement {{ encaissement.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <div v-if="!$fetchState.pending" class="card card-invoice">
          <div class="card-header">
            <div>
              <span v-if="encaissement.caissier" class="tx-sm text-muted">
                fait le: {{ $moment(encaissement.created_at).format('ll') }} par
                {{ encaissement.caissier.user.name }}
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
                <h6 class="tx-15 mg-b-10">Paiement par: {{ encaissement.type }}</h6>
                <p class="mg-b-0">Guichet: {{ encaissement.ouverture.guichet.nom }}</p>
              </div>
            </div>
            <div class="table-responsive mt-3">
              <table class="table table-invoice bd-b">
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
                      <span v-else>{{ encaissement.ordonnancement.emplacement.code }}</span>
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
          </div>
        </div>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { invoicePrinter } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: { id: { type: Number, required: true } },
  data() {
    return {
      encaissement: { code: null },
    }
  },
  async fetch() {
    const { encaissement } = await this.getEncaissement(this.id)
    this.encaissement = encaissement
    try {
      await this.getSociete()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
  },
  computed: {
    ...mapGetters({ societe: MODULES.APPLICATION.GETTERS.SOCIETE }),
  },
  methods: {
    ...mapActions({
      getSociete: MODULES.APPLICATION.ACTIONS.ONE,
      getEncaissement: MODULES.ENCAISSEMENT.ACTIONS.ONE,
    }),
    imprimer() {
      invoicePrinter(this.societe, this.encaissement)
    },
  },
}
</script>

<style></style>
