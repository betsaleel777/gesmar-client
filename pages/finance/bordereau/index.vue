<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab id="tableau" title="Tableau" :title-link-class="linkClass(0)">
          <TableauBordereau />
        </b-tab>
        <b-tab id="commerciaux" title="Commerciaux" :title-link-class="linkClass(1)">
          <ListeCommercial />
        </b-tab>
        <b-tab id="bordereaux" title="Bordereaux" :title-link-class="linkClass(2)">
          <ListeBordereau />
        </b-tab>
      </b-tabs>
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import TableauBordereau from '~/components/finance/TableauBordereau.vue'
import ListeBordereau from '~/components/finance/bordereau/ListeBordereau.vue'
import ListeCommercial from '~/components/finance/commerciaux/ListeCommercial.vue'
export default {
  components: {
    PartialBreadcrumb,
    TableauBordereau,
    ListeBordereau,
    ListeCommercial,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Bordereaux' }],
    tabIndex: 0,
  }),
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
