<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Tableau" :title-link-class="linkClass(0)">
          <TableauFacture />
        </b-tab>
        <b-tab title="Factures Initiales" :title-link-class="linkClass(1)">
          <ListeFactureInitiale />
        </b-tab>
        <b-tab title="Factures Loyer" :title-link-class="linkClass(2)">
          <ListeFactureLoyer />
        </b-tab>
        <b-tab title="Factures Annexes" :title-link-class="linkClass(3)">
          <ListeFactureAnnexe />
        </b-tab>
        <b-tab title="Factures Equipements" :title-link-class="linkClass(4)">
          <ListeFactureEquipement />
        </b-tab>
      </b-tabs>
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeFactureInitiale from '~/components/finance/facture/initiale/ListeFactureInitiale.vue'
import ListeFactureLoyer from '~/components/finance/facture/loyer/ListeFactureLoyer.vue'
import ListeFactureEquipement from '~/components/finance/facture/equipement/ListeFactureEquipement.vue'
import ListeFactureAnnexe from '~/components/finance/facture/annexe/ListeFactureAnnexe.vue'
import TableauFacture from '~/components/finance/facture/TableauFacture.vue'
export default {
  components: {
    PartialBreadcrumb,
    ListeFactureInitiale,
    ListeFactureLoyer,
    ListeFactureEquipement,
    ListeFactureAnnexe,
    TableauFacture,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Factures' }],
    tabIndex: 0,
  }),
  fetch() {
    this.getFacturesEquipements()
    this.getFacturesAnnexes()
    this.getContrats()
    this.getPersonnes()
  },
  computed: {
    ...mapGetters({
      equipements: 'facture/equipement/factures',
      annexes: 'facture/annexe/factures',
      contrats: 'exploitation/contrat/contrats',
      personnes: 'exploitation/personne/personnes',
    }),
  },
  methods: {
    ...mapActions({
      getFacturesEquipements: 'facture/equipement/getAll',
      getFacturesAnnexes: 'facture/annexe/getAll',
      getContrats: 'exploitation/contrat/getAll',
      getPersonnes: 'exploitation/personne/getAll',
    }),
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
