<template>
  <b-modal v-model="dialog" scrollable size="lg">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Créer un rôle</h5>
      <button type="button" class="close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <div class="form-group required">
        <label class="form-label mg-t-10">Nom</label>
        <input
          v-model="role.name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name.exist }"
          placeholder="Entrer le nom du rôle"
        />
        <span v-if="errors.name.exist" class="invalid-feedback" role="alert">
          <strong>{{ errors.name.message }}</strong>
        </span>
      </div>
      <span v-if="errors.permissions.exist" class="text-danger" role="alert">
        <strong>{{ errors.permissions.message }}</strong>
      </span>
      <SelectPermissionTable v-model="role.permissions" />
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" @click="dialog = false">Fermer</button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import SelectPermissionTable from '../permission/SelectPermissionTable.vue'
import { MODULES } from '~/helper/modules-types'
import { errorHandling } from '~/helper/helpers'
import modal from '~/mixins/modal'
export default {
  components: { SelectPermissionTable },
  mixins: [modal],
  data: () => ({
    role: {
      name: '',
      permissions: [],
    },
    errors: {
      name: { exist: false, message: null },
      permissions: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions({ ajouter: MODULES.ROLE.ACTIONS.ADD }),
    save() {
      this.role.permissions = this.role.permissions.map((elt) => elt.id)
      this.ajouter(this.role)
        .then(({ message }) => {
          this.dialog = false
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
    },
  },
}
</script>
<style></style>
