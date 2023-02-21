<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <b-tabs v-model="tabIndex" content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Utilisateurs" lazy :title-link-class="linkClass(0)">
          <ListeUser v-if="!archive.user" @archivage="archive.user = true" />
          <ListeUserArchive v-else @back="archive.user = false" />
        </b-tab>
        <b-tab title="Rôles" lazy :title-link-class="linkClass(1)">
          <ListeRole />
        </b-tab>
        <b-tab title="Permissions" lazy :title-link-class="linkClass(2)">
          <ListePermission />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import ListePermission from '~/components/permission/ListePermission.vue'
import ListeUser from '~/components/utilisateur/ListeUser.vue'
import ListeUserArchive from '~/components/utilisateur/ListeUserArchive.vue'
import ListeRole from '~/components/role/ListeRole.vue'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: {
    ListePermission,
    ListeRole,
    ListeUser,
    PartialBreadcrumb,
    ListeUserArchive,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Utilisateurs & fonctions' }],
    archive: { user: false },
    tabIndex: 0,
  }),
  methods: {
    onBack(numero) {
      if (numero === 0) this.archive.user = false
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-primary']
      } else {
        return ['bg-light', 'text-primary']
      }
    },
  },
}
</script>
<style></style>
