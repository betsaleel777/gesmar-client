<template>
  <b-modal id="modalCreateRole" scrollable size="lg" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Créer un rôle</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
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
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import SelectPermissionTable from '../permission/SelectPermissionTable.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: {
    SelectPermissionTable,
  },
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
    ...mapActions('user-role/role', ['ajouter']),
    save() {
      this.role.permissions = this.role.permissions.map((elt) => elt.id)
      this.ajouter(this.role)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateRole')
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
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
    },
    reset() {
      this.role = {
        name: '',
        permissions: [],
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateRole')
    },
  },
}
</script>
<style></style>
