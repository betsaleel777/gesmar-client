<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <ul id="tabParametre" class="nav nav-line" role="tablist">
        <li class="nav-item">
          <a
            id="user-tab"
            class="nav-link active"
            data-toggle="tab"
            href="#user"
            role="tab"
            aria-controls="user"
            aria-selected="true"
            >Utilisateurs</a
          >
        </li>
        <li class="nav-item">
          <a
            id="role-tab"
            class="nav-link"
            data-toggle="tab"
            href="#role"
            role="tab"
            aria-controls="role"
            aria-selected="false"
            >Rôles</a
          >
        </li>
        <li class="nav-item">
          <a
            id="permission-tab5"
            class="nav-link"
            data-toggle="tab"
            href="#permission"
            role="tab"
            aria-controls="permission"
            aria-selected="false"
            >Permissions</a
          >
        </li>
      </ul>

      <div id="tabParametreContent" class="tab-content mg-t-20">
        <div
          id="user"
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="user-tab"
        >
          <ListeUser v-if="!archive.user" @archivage="archive.user = true" />
          <ListeUserArchive v-else @back="archive.user = false" />
        </div>
        <div
          id="role"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="role-tab"
        >
          <ListeRole />
        </div>
        <div
          id="permission"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="permission-tab"
        >
          <ListePermission />
        </div>
      </div>
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
  }),
  methods: {},
}
</script>
<style></style>
