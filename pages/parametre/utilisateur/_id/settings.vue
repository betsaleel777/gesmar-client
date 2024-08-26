<template>
  <div class="content-body">
    <PartialBreadcrumb :liens="liens" />
    <div class="row row-xs">
      <div class="col-md-4">
        <ul class="list-group list-group-settings">
          <li class="list-group-item list-group-item-action">
            <a href="#paneProfile" data-toggle="tab" class="media active">
              <feather type="user" />
              <div class="media-body">
                <h6>Information de profil</h6>
                <span>Vos informations personnelles</span>
              </div>
            </a>
          </li>
          <li class="list-group-item list-group-item-action">
            <a href="#paneAccount" data-toggle="tab" class="media">
              <feather type="settings" />
              <div class="media-body">
                <h6>Compte</h6>
                <span>Suppression définitive du compte</span>
              </div>
            </a>
          </li>
          <li class="list-group-item list-group-item-action">
            <a href="#paneSecurity" data-toggle="tab" class="media">
              <feather type="shield" />
              <div class="media-body">
                <h6>Sécurité</h6>
                <span>Gestion des mots de passe</span>
              </div>
            </a>
          </li>
          <li v-can="permissions.attribuateRole" class="list-group-item list-group-item-action">
            <a href="#panePermissions" data-toggle="tab" class="media">
              <feather type="users" />
              <div class="media-body">
                <h6>Permissions</h6>
                <span>Roles Permissions à assigner</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- col -->
      <div class="col-md-8">
        <div class="card card-body pd-sm-40 pd-md-30 pd-xl-y-35 pd-xl-x-40">
          <div class="tab-content">
            <ProfileSetup :id="id" :profile-data="profileData" />
            <!-- tab-pane -->
            <AccountSetup :id="id" :nom="nom" />
            <!-- tab-pane -->
            <SecuritySetup :id="id" />
            <!-- tab-pane -->
            <PermissionSetup :id="id" v-can="permissions.attribuateRole" />
            <!-- tab-pane -->
            <!-- <NotificationSetup :id="id" /> -->
            <!-- tab-pane -->
          </div>
          <!-- tab-content -->
        </div>
        <!-- card -->
      </div>
      <!-- col -->
    </div>
    <!-- row -->
  </div>
</template>
<script>
import ProfileSetup from '~/components/utilisateur/ProfileSetup.vue'
import AccountSetup from '~/components/utilisateur/AccountSetup.vue'
import SecuritySetup from '~/components/utilisateur/SecuritySetup.vue'
import PermissionSetup from '~/components/utilisateur/PermissionSetup.vue'
import { utilisateur } from '~/helper/permissions'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: {
    ProfileSetup,
    AccountSetup,
    SecuritySetup,
    PermissionSetup,
    PartialBreadcrumb,
  },
  async asyncData({ params, store }) {
    const {
      user: {
        avatar,
        name,
        description,
        adresse,
        sites,
        role: { name: roleName },
      },
    } = await store.dispatch('user-role/user/getOne', params.id)
    const profileData = { avatar, name, description, adresse, id: params.id, sites, roleName }
    return {
      nom: name,
      id: Number(params.id),
      profileData,
      liens: [
        { path: '/parametre/utilisateur', text: 'Utilisateurs' },
        { path: '#', text: `utilisateur ${name}` },
      ],
    }
  },
  data: () => ({
    permissions: utilisateur,
  }),
}
</script>
