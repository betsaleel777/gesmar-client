<template>
  <div class="container-fluid">
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
import ListeUser from '~/components/utilisateur/ListeUser.vue'
export default {
  components: { ListeUser },
  data: () => ({
    liens: [{ path: '#', text: 'Configuration de marché' }],
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
