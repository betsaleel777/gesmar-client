<template>
  <div id="paneBilling" class="tab-pane">
    <h6 class="tx-uppercase tx-semibold tx-color-01 mg-b-0">Permissions</h6>
    <hr />
    <div class="form-settings mx-wd-100p">
      <div class="form-group">
        <label class="form-label mg-t-5">Rôle</label>
        <multiselect
          v-model="utilisateur.role"
          track-by="value"
          label="text"
          placeholder="choix du rôle"
          :show-label="true"
          :options="options"
        ></multiselect>
        <span v-if="errors.name.exist" class="invalid-feedback" role="alert">
          <strong>{{ errors.name.message }}</strong>
        </span>
        <div class="tx-11 tx-sans tx-color-04 mg-t-5">
          Le rôle que vous choisissez est ceci celà
        </div>
      </div>
      <!-- form-group -->
      <div class="form-group">
        <SelectPermissionTable v-model="utilisateur.permissions" />
      </div>
      <button type="button" class="btn btn-brand-02" @click="save">
        enregistrer
      </button>
      <!-- form-group -->
    </div>
    <!-- form-settings -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'
import SelectPermissionTable from '~/components/permission/SelectPermissionTable.vue'
export default {
  components: {
    SelectPermissionTable,
    Multiselect,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    utilisateur: {
      role: null,
      permissions: [],
      infos: null,
    },
    errors: {
      name: { exist: false, message: null },
    },
    options: [],
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
    const { user: utilisateur, role, permissions } = await this.getOne(this.id)
    this.utilisateur.role = role
    this.utilisateur.permissions = permissions
    this.utilisateur.infos = utilisateur
  },
  methods: {
    ...mapActions({
      getOne: 'user-role/user/getOne',
      autoriser: 'user-role/user/autoriser',
      getRoles: 'user-role/role/getAll',
    }),
    save() {
      this.autoriser(this.utilisateur).then(({ message }) => {})
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style></style>
