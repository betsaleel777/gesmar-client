<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <b-nav tabs>
      <b-nav-item to="/finance/bordereau" :active-class="'bg-white text-primary'" :link-classes="link" exact :exact-active-class="active('/finance/bordereau')"
        >Tableau</b-nav-item
      >
      <b-nav-item
        to="/finance/bordereau/parent/commercial"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/bordereau/parent/commercial')"
        >Commerciaux</b-nav-item
      >
      <b-nav-item
        to="/finance/bordereau/parent/bordereau"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/bordereau/parent/bordereau')"
        >Bordereaux</b-nav-item
      >
    </b-nav>
    <TableauBordereau class="mt-5" />
  </div>
</template>
<script>
import TableauBordereau from '~/components/finance/TableauBordereau.vue'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: { TableauBordereau, PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Acceuil Bordereaux' }],
    link: ['bg-light', 'text-primary'],
  }),
  head: {
    title: 'Acceuil Bordereau',
    meta: [
      {
        hid: 'Bordereau',
        name: 'Bordereau',
        content: 'Tableau de bord des bordereaux',
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
