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
        to="/finance/bordereau/parent/bordereaux"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/finance/bordereau/parent/bordereaux')"
        >Bordereaux</b-nav-item
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
    titleTemplate: 'Bordereaux %s',
  },
  computed: {
    liens() {
      return [
        { path: '/finance/bordereau', text: 'Acceuil Bordereaux' },
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
