<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <b-nav tabs>
      <b-nav-item to="/finance/caisse" :active-class="'bg-white text-primary'" :link-classes="link" exact :exact-active-class="active('/finance/caisse')"
        >Tableau</b-nav-item
      >
      <b-nav-item
        to="/finance/caisse/parent/ouverture"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/caisse/parent/ouverture')"
        >Ouvertures de caisse</b-nav-item
      >
      <b-nav-item
        to="/finance/caisse/parent/point-caisse"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/caisse/parent/point-caisse')"
        >Points de caisse</b-nav-item
      >
      <b-nav-item
        to="/finance/caisse/parent/encaissement"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/caisse/parent/encaissement')"
        >Encaissements</b-nav-item
      >
    </b-nav>
    <TableauCaisse class="mt-5" />
  </div>
</template>
<script>
import TableauCaisse from '~/components/finance/caisse/TableauCaisse.vue'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: { TableauCaisse, PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Acceuil Caisse' }],
    link: ['bg-light', 'text-primary'],
  }),
  head: {
    title: 'Acceuil Caisse',
    meta: [
      {
        hid: 'Caisse',
        name: 'Caisse',
        content: 'Tableau de bord de la caisse',
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
