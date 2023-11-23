<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab id="tableau" title="Tableau" :title-link-class="linkClass(0)">
          <TableauBordereau />
        </b-tab>
        <b-tab
          id="commerciaux"
          :disabled="disableCommerciaux"
          title="Commerciaux"
          :title-link-class="linkClass(1)"
        >
          <ListeCommercial />
        </b-tab>
        <b-tab
          id="bordereaux"
          :disabled="disableBordereau"
          title="Bordereaux"
          :title-link-class="linkClass(2)"
        >
          <ListeBordereaux />
        </b-tab>
      </b-tabs>
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import TableauBordereau from '~/components/finance/TableauBordereau.vue'
import ListeCommercial from '~/components/finance/commerciaux/ListeCommercial.vue'
import ListeBordereaux from '~/components/finance/bordereau/ListeBordereaux.vue'
import { finance } from '~/helper/permissions'
const permissions = finance.bordereaux
export default {
  components: {
    PartialBreadcrumb,
    TableauBordereau,
    ListeCommercial,
    ListeBordereaux,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Bordereaux' }],
    tabIndex: 0,
    permissions,
  }),
  computed: {
    disableBordereau() {
      return !this.$gates.hasPermission(permissions.bordereau.acceder)
    },
    disableCollecte() {
      return !this.$gates.hasPermission(permissions.collecte.acceder)
    },
    disableCommerciaux() {
      return !this.$gates.hasPermission(permissions.commerciaux.acceder)
    },
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-primary']
      } else {
        return ['bg-light', 'text-primary']
      }
    },
  },
}
</script>
<style></style>
