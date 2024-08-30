<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
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
    <NuxtChild class="mt-5" />
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import { LINKS } from '~/helper/constantes'

export default {
  components: { PartialBreadcrumb },
  data: () => ({
    link: ['bg-light', 'text-primary'],
  }),
  head: {
    titleTemplate: 'Facturation %s',
  },
  computed: {
    liens() {
      return [
        { path: '/finance/facture', text: 'Acceuil Facturation' },
        { path: '#', text: LINKS[this.$route.fullPath.split('/').at(-1)] },
      ]
    },
  },
  methods: {
    active(route) {
      return this.$route.path === route ? 'active' : ''
    },
  },
}
</script>
