<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Tableau de bord" :title-link-class="linkClass(0)">
          <TableauFacture />
        </b-tab>
        <b-tab :disabled="disableInitiale" title="Factures Initiales" :title-link-class="linkClass(1)">
          <ListeFactureInitiale />
        </b-tab>
        <b-tab :disabled="disableLoyer" title="Factures Loyer" :title-link-class="linkClass(2)">
          <ListeFactureLoyer />
        </b-tab>
        <b-tab :disabled="disableAnnexe" title="Factures Annexes" :title-link-class="linkClass(3)">
          <ListeFactureAnnexe />
        </b-tab>
        <b-tab :disabled="disableEquipement" title="Factures Equipements" :title-link-class="linkClass(4)">
          <ListeFactureEquipement />
        </b-tab>
        <b-tab title="Factures Soldées" :title-link-class="linkClass(5)">
          <ListeFactureSoldee />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeFactureInitiale from '~/components/finance/facture/initiale/ListeFactureInitiale.vue'
import ListeFactureLoyer from '~/components/finance/facture/loyer/ListeFactureLoyer.vue'
import ListeFactureEquipement from '~/components/finance/facture/equipement/ListeFactureEquipement.vue'
import ListeFactureAnnexe from '~/components/finance/facture/annexe/ListeFactureAnnexe.vue'
import ListeFactureSoldee from '~/components/finance/facture/ListeFactureSoldee.vue'
import TableauFacture from '~/components/finance/facture/TableauFacture.vue'
import { factureAnnexe, factureEquipement, factureInitiale, factureLoyer } from '~/helper/permissions'
export default {
  components: {
    PartialBreadcrumb,
    ListeFactureInitiale,
    ListeFactureLoyer,
    ListeFactureEquipement,
    ListeFactureAnnexe,
    ListeFactureSoldee,
    TableauFacture,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Factures' }],
    tabIndex: 0,
  }),
  computed: {
    disableAnnexe() {
      return !this.$gates.hasAnyPermission(`${factureAnnexe.global}|${factureAnnexe.own}`)
    },
    disableInitiale() {
      return !this.$gates.hasAnyPermission(`${factureInitiale.global}|${factureInitiale.own}`)
    },
    disableEquipement() {
      return !this.$gates.hasAnyPermission(`${factureEquipement.global}|${factureEquipement.own}`)
    },
    disableLoyer() {
      return !this.$gates.hasAnyPermission(`${factureLoyer.global}|${factureLoyer.own}`)
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
