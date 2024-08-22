<template>
  <div class="container-fluid">
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
export default {
  data: () => ({
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
