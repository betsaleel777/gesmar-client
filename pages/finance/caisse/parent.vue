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
    titleTemplate: 'Caisse %s',
  },
  computed: {
    liens() {
      return [
        { path: '/finance/caisse', text: 'Acceuil Caisse' },
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
