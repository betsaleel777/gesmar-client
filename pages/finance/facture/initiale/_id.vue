<template>
  <div class="container-fluid">
    <div class="d-flex d-print-none">
      <PartialBreadcrumb :liens="liens" />
    </div>
    <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
      <WrapperFacture v-if="!$fetchState.pending" :societe="societe">
        <ApercuFactureInitiale :facture="facture" @printed="imprimer" />
      </WrapperFacture>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ApercuFactureInitiale from '~/components/finance/facture/initiale/ApercuFactureInitiale.vue'
import WrapperFacture from '~/components/finance/facture/WrapperFacture.vue'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import { MODULES } from '~/helper/modules-types'

export default {
  components: { PartialBreadcrumb, WrapperFacture, ApercuFactureInitiale },
  data: () => ({
    facture: { code: null },
  }),
  async fetch() {
    await this.getSociete()
    const { facture } = await this.getOne(this.$route.params.id)
    this.facture = facture
  },
  head() {
    return {
      title: `Aperçu de la facture ${this.facture.code}`,
      meta: [
        {
          hid: `facture ${this.facture.code}`,
          name: `facture ${this.facture.code}`,
          content: `Aperçu de la facture ${this.facture.code}`,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ societe: MODULES.APPLICATION.GETTERS.SOCIETE }),
    liens() {
      return [
        { path: '/finance/facture', text: 'Acceuil Facturation' },
        { path: '/finance/facture/parent/initiale', text: 'Factures PDP' },
        { path: '#', text: this.facture.code },
      ]
    },
  },
  methods: {
    ...mapActions({ getOne: MODULES.FACTURE.INITIALE.ACTIONS.ONE, getSociete: MODULES.APPLICATION.ACTIONS.ONE }),
    imprimer() {
      window.document.title = `${this.facture.code}-${this.$moment().unix()}`
      window.print()
    },
  },
}
</script>
<style scoped>
@media print {
  .container-fluid {
    padding-inline: 0px;
  }
}
</style>
