<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-overlay :show="$fetchState.pending" rounded="sm">
          <b-tab title="Tableau" :title-link-class="linkClass(0)">
            <TableauFacture />
          </b-tab>
          <b-tab title="Factures Initiales" :title-link-class="linkClass(1)">
            <ListeFactureInitiale :factures="initiales" />
          </b-tab>
          <b-tab title="Factures Loyer" :title-link-class="linkClass(2)">
            <ListeFactureLoyer :factures="loyers" :contrats="contrats" :personnes="personnes" />
          </b-tab>
          <b-tab title="Factures Annexes" :title-link-class="linkClass(3)">
            <ListeFactureAnnexe :factures="annexes" :contrats="contrats" :personnes="personnes" />
          </b-tab>
          <b-tab title="Factures Equipements" :title-link-class="linkClass(4)">
            <ListeFactureEquipement :factures="equipements" :contrats="contrats" :personnes="personnes" />
          </b-tab>
        </b-overlay>
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
    this.getFacturesInitiales()
    this.getFacturesLoyers()
    this.getFacturesEquipements()
    this.getFacturesAnnexes()
    this.getContrats()
    this.getPersonnes()
  },
  computed: {
    ...mapGetters({
      initiales: 'facture/initiale/factures',
      loyers: 'facture/loyer/factures',
      equipements: 'facture/equipement/factures',
      annexes: 'facture/annexe/factures',
      contrats: 'exploitation/contrat/contrats',
      personnes: 'exploitation/personne/personnes',
    }),
  },
  methods: {
    ...mapActions({
      getFacturesInitiales: 'facture/initiale/getAll',
      getFacturesLoyers: 'facture/loyer/getAll',
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
