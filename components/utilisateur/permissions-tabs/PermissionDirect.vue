<template>
  <v-app>
    <div class="form-settings mx-wd-100p">
      <div class="form-group">
        <SelectPermissionTable
          :key="cle"
          v-model="utilisateur.permissions"
          :permissions-disabled="true"
          :direct-mode="true"
        />
      </div>
      <button type="button" class="btn btn-brand-02" @click="save">
        enregistrer
      </button>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import SelectPermissionTable from '~/components/permission/SelectPermissionTable.vue'
export default {
  components: {
    SelectPermissionTable,
  },
  inject: ['id'],
  data: () => ({
    utilisateur: {
      id: null,
      role: null,
      permissions: [],
    },
    cle: false,
    directes: [],
  }),
  async mounted() {
    const { user: utilisateur, permissions } = await this.getOne(this.id)
    this.utilisateur.permissions = permissions
    if (utilisateur.roles.length > 0)
      this.utilisateur.role = utilisateur.roles[0].id
    this.directes = utilisateur.permissions
    this.cle = !this.cle
    this.fetchRole()
    this.utilisateur.id = utilisateur.id
  },
  methods: {
    ...mapActions({
      getOne: 'user-role/user/getOne',
      autoriser: 'user-role/user/autoriser',
      getRole: 'user-role/role/getOne',
    }),
    save() {
      this.autoriser(this.utilisateur).then(({ message }) => {
        this.$bvToast.toast(message, {
          title: "succès d'autorisation".toLocaleUpperCase(),
          variant: 'success',
          solid: true,
        })
      })
    },
    async fetchRole() {
      const role = await this.getRole(this.utilisateur.role)
      this.utilisateur.permissions = [...role.permissions, ...this.directes]
      this.utilisateur.permissions = role.permissions
      this.cle = !this.cle
    },
  },
}
</script>

<style scoped></style>
