<template>
  <v-app>
    <div class="form-settings mx-wd-100p">
      <div class="form-group">
        <v-autocomplete
          v-model="utilisateur.role"
          :items="options"
          :attach="true"
          item-text="text"
          item-value="value"
          :error="errors.role.exist"
          :error-messages="errors.role.message"
          @change="fetchRole"
        ></v-autocomplete>
      </div>
      <div class="form-group">
        <DisplayPermissionTable
          :key="cle"
          :permissions-roles="utilisateur.permissions"
          :permissions-directes="directes"
        />
      </div>
      <button type="button" class="btn btn-brand-02" @click="save">
        enregistrer
      </button>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import DisplayPermissionTable from '~/components/permission/DisplayPermissionTable.vue'
export default {
  components: {
    DisplayPermissionTable,
  },
  inject: ['id'],
  data: () => ({
    utilisateur: {
      id: null,
      role: null,
      permissions: [],
    },
    errors: {
      role: { exist: false, message: null },
    },
    options: [],
    cle: false,
    directes: [],
  }),
  computed: {
    ...mapGetters({ roles: 'user-role/role/roles' }),
  },
  async mounted() {
    this.getRoles().then(() => {
      this.options = this.roles.map((role) => {
        return { text: role.name, value: role.id }
      })
    })
    const { user: utilisateur, permissions } = await this.getOne(this.id)
    if (utilisateur.roles.length > 0)
      this.utilisateur.role = utilisateur.roles[0].id
    this.directes = permissions
    this.fetchRole()
    this.utilisateur.id = utilisateur.id
  },
  methods: {
    ...mapActions({
      getOne: 'user-role/user/getOne',
      autoriser: 'user-role/user/autoriser',
      getRoles: 'user-role/role/getAll',
      getRole: 'user-role/role/getOne',
    }),
    save() {
      this.autoriser(this.utilisateur)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: "succès d'autorisatyyion".toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          // location.reload()
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
    },
    async fetchRole() {
      const role = await this.getRole(this.utilisateur.role)
      this.utilisateur.permissions = role.permissions
      this.cle = !this.cle
    },
  },
}
</script>

<style scoped></style>
