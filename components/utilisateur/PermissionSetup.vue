<template>
  <div id="panePermissions" class="tab-pane">
    <b-overlay :show="$fetchState.pending" rounded="sm">
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
    role: 0,
    submiting: false,
    errors: {
      role: { exist: false, message: null },
    },
  }),
  async fetch() {
    await this.getRoles()
    const { user: utilisateur } = await this.getOne(this.id)
    if (utilisateur.roles.length > 0) this.role = utilisateur.roles[0].id
  },
  computed: {
    ...mapGetters({ roles: 'user-role/role/roles' }),
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
