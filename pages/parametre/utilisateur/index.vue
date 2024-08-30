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
    <ListeUser class="mt-5" />
  </div>
</template>

<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeUser from '~/components/utilisateur/ListeUser.vue'
export default {
  components: { ListeUser, PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Utilisateurs & rôles' }],
    link: ['bg-light', 'text-primary'],
    activeClass: 'bg-white text-primary',
  }),
  head: {
    title: 'Utilisateurs',
    meta: [
      {
        hid: 'Utilisateurs',
        name: 'Utilisateurs',
        content: 'Liste des utilisateurs',
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
