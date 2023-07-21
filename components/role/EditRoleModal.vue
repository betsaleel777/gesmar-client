<template>
  <b-modal id="modalEditRole" v-model="dialog" scrollable size="lg">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Modifier rôle</h5>
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
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
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
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  async mounted() {
    this.role = await this.getOne(this.id)
  },
  methods: {
    ...mapActions('user-role/role', ['modifier', 'getOne']),
    save() {
      this.role.permissions = this.role.permissions.map((elt) => elt.id)
      this.modifier(this.role)
        .then(({ message }) => {
          this.$emit('edited', message)
          this.dialog = false
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
      this.role = { name: '', permissions: [] }
      this.dialog = false
      errorsInitialise(this.errors)
    },
  },
}
</script>
<style></style>
