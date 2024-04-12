<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Tableau" :title-link-class="linkClass(0)">
          <TableauCaisse />
        </b-tab>
        <b-tab :disabled="disableOuverture" title="Ouverture" :title-link-class="linkClass(1)">
          <ListeOuverture />
        </b-tab>
        <b-tab :disabled="disablePoint" title="Point de caisse" :title-link-class="linkClass(2)">
          <ListeFermeture />
        </b-tab>
        <b-tab :disabled="disableEncaissement" title="Encaissement" :title-link-class="linkClass(3)">
          <ListeEncaissement />
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
import { ouverture, fermeture, encaissement } from '~/helper/permissions'
export default {
  components: { PartialBreadcrumb, TableauCaisse, ListeOuverture, ListeFermeture, ListeEncaissement },
  data: () => ({
    liens: [{ path: '#', text: 'Caisse' }],
    tabIndex: 0,
  }),
  computed: {
    disableOuverture() {
      return !this.$gates.hasAnyPermission(`${ouverture.global}|${ouverture.own}`)
    },
    disablePoint() {
      return !this.$gates.hasAnyPermission(`${fermeture.global}|${fermeture.own}`)
    },
    disableEncaissement() {
      return !this.$gates.hasAnyPermission(`${encaissement.global}|${encaissement.own}`)
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
