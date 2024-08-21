<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <b-nav tabs>
      <b-nav-item to="/parametre/caisse" :active-class="activeClass" :link-classes="link" exact :exact-active-class="active('/parametre/caisse')"
        >Guichet</b-nav-item
      >
      <b-nav-item
        to="/parametre/caisse/parent/caissier"
        :active-class="activeClass"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/caisse/parent/caissier')"
        >Caissier</b-nav-item
      >
      <b-nav-item
        to="/parametre/caisse/parent/compte"
        :active-class="activeClass"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/caisse/parent/compte')"
        >Compte</b-nav-item
      >
      <b-nav-item
        to="/parametre/caisse/parent/banque"
        :active-class="activeClass"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/caisse/parent/banque')"
        >Banque</b-nav-item
      >
    </b-nav>
    <NuxtChild class="mt-5" />
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: { PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Parametres Caisse' }],
    link: ['bg-light', 'text-primary'],
    activeClass: 'bg-white text-primary',
  }),
  head: {
    titleTemplate: 'Parametrage de caisse %s',
  },
  methods: {
    active(route) {
      return this.$route.path === route ? 'active' : ''
    },
  },
}
</script>
