<template>
  <div id="panePermissions" class="tab-pane">
    <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
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
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import { SUPERROLE } from '~/helper/constantes'
export default {
  components: {
    PermissionTable,
  },
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
          this.$bvToast.toast(message, {
            title: "succès de l'opération".toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          location.reload()
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style></style>
