<template>
  <div class="container-fluid">
    <b-nav tabs>
      <b-nav-item to="/finance/facture" :active-class="'bg-white text-primary'" :link-classes="link" exact :exact-active-class="active('/finance/facture')"
        >Tableau</b-nav-item
      >
      <b-nav-item
        to="/finance/facture/parent/initiale"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/facture/parent/initiale')"
        >Factures PDP</b-nav-item
      >
      <b-nav-item
        to="/finance/facture/parent/loyer"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/facture/parent/loyer')"
        >Factures de loyer</b-nav-item
      >
      <b-nav-item
        to="/finance/facture/parent/annexe"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/facture/parent/annexe')"
        >Factures annexe</b-nav-item
      >
      <b-nav-item
        to="/finance/facture/parent/equipement"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/facture/parent/equipement')"
        >Factures equipement</b-nav-item
      >
      <b-nav-item
        to="/finance/facture/parent/soldee"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/facture/parent/soldee')"
        >Factures soldées</b-nav-item
      >
    </b-nav>
    <TableauFacture class="mt-5" />
  </div>
</template>
<script>
import TableauFacture from '~/components/finance/facture/TableauFacture.vue'
export default {
  components: { TableauFacture },
  data: () => ({
    liens: [{ path: '#', text: 'Facturation Quittance' }],
    link: ['bg-light', 'text-primary'],
  }),
  head: {
    title: 'Acceuil Facturation',
    meta: [
      {
        hid: 'Facturation',
        name: 'Facturation',
        content: 'Tableau de bord de la facturation',
      },
    ],
  },
  methods: {
    active(route) {
      return this.$route.path === route ? 'active' : ''
    },
  },
}
</script>
