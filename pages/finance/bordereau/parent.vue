<template>
  <div class="container-fluid">
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
    <NuxtChild class="mt-5" />
  </div>
</template>
<script>
export default {
  data: () => ({
    link: ['bg-light', 'text-primary'],
  }),
  head: {
    titleTemplate: 'Bordereaux %s',
  },
  methods: {
    active(route) {
      return this.$route.path === route ? 'active' : ''
    },
  },
}
</script>
