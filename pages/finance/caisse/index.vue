<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab id="tableau" title="Tableau" :title-link-class="linkClass(0)">
          <TableauCaisse />
        </b-tab>
        <b-tab id="ouverture" title="Ouverture" :title-link-class="linkClass(1)">
          <ListeOuverture />
        </b-tab>
        <b-tab id="fermeture" title="Fermeture" :title-link-class="linkClass(2)">
          <ListeFermeture />
        </b-tab>
        <b-tab id="encaissement" title="Encaissement" :title-link-class="linkClass(3)">
          <ListeEncaissement />
        </b-tab>
        <b-tab id="point" title="Point de caisse" :title-link-class="linkClass(4)">
          <ListePoint />
        </b-tab>
      </b-tabs>
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import TableauCaisse from '~/components/finance/caisse/TableauCaisse.vue'
import ListeOuverture from '~/components/finance/caisse/ouverture/ListeOuverture.vue'
import ListeFermeture from '~/components/finance/caisse/fermeture/ListeFermeture.vue'
import ListeEncaissement from '~/components/finance/caisse/encaissement/ListeEncaissement.vue'
import ListePoint from '~/components/finance/caisse/point/ListePoint.vue'
export default {
  components: {
    PartialBreadcrumb,
    TableauCaisse,
    ListeOuverture,
    ListeFermeture,
    ListeEncaissement,
    ListePoint,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Caisse' }],
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
