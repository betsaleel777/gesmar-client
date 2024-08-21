<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <b-nav tabs>
      <b-nav-item to="/parametre/utilisateur" :active-class="activeClass" :link-classes="link" exact :exact-active-class="active('/parametre/utilisateur')"
        >Utilisateur</b-nav-item
      >
      <b-nav-item
        to="/parametre/utilisateur/parent/role"
        :active-class="activeClass"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/utilisateur/parent/role')"
        >Role</b-nav-item
      >
      <b-nav-item
        to="/parametre/utilisateur/parent/permission"
        :active-class="activeClass"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/utilisateur/parent/permission')"
        >Permissions</b-nav-item
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
    titleTemplate: 'Parametrage des utilisateurs - %s',
  },
  methods: {
    active(route) {
      return this.$route.path === route ? 'active' : ''
    },
  },
}
</script>
