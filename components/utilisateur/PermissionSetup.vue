<template>
  <div id="panePermissions" class="tab-pane">
    <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
      <v-app>
        <v-autocomplete
          v-model="role"
          :items="roles"
          item-text="name"
          item-value="id"
          outlined
          dense
          :error="errors.role.exist"
          :error-messages="errors.role.message"
        >
          <template #label>
            Role actuel
            <span class="red--text"><strong>* </strong></span>
          </template>
        </v-autocomplete>
        <v-alert v-if="isSuperole" dense text type="info">
          L'utilisateur avec le rôle {{ superole }} a tout les droits
        </v-alert>
        <PermissionTable :key="role" :role="role" />
        <v-btn block color="primary" small :disabled="submiting" @click="save"
          >valider la selection du rôle</v-btn
        >
      </v-app>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import PermissionTable from './PermissionTable.vue'
import { SUPERROLE } from '~/helper/constantes'
import { errorHandling } from '~/helper/helpers'
export default {
  components: { PermissionTable },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    superole: SUPERROLE,
    role: 0,
    submiting: false,
    errors: {
      role: { exist: false, message: null },
    },
  }),
  async fetch() {
    await this.getRoles()
    const { user: utilisateur } = await this.getOne(this.id)
    this.role = utilisateur.role.id
  },
  computed: {
    ...mapGetters({ roles: 'user-role/role/roles' }),
    isSuperole() {
      if (!this.role) return false
      else {
        const role = this.roles.filter((role) => role.id === this.role)[0]
        return role.name === SUPERROLE
      }
    },
  },
  methods: {
    ...mapActions({
      getRoles: 'user-role/role/getAll',
      getOne: 'user-role/user/getOne',
      attribuer: 'user-role/user/attribuer',
    }),
    save() {
      this.submiting = true
      this.attribuer({ role: this.role, user: this.id })
        .then((message) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          location.reload()
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style></style>
