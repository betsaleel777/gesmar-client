<template>
  <b-card aria-hidden="true" header="Liste des rôles">
    <b-card-text>
      <div class="btn-toolbar d-flex flex-row-reverse">
        <feather
          v-can="permissions.create"
          v-b-tooltip.hover.top
          title="créer"
          class="btn btn-sm btn-primary btn-icon"
          stroke-width="2"
          size="18"
          type="plus"
          @click="create = true"
        />
      </div>
      <hr class="mg-t-4" />
      <b-form-input
        id="filter-input"
        v-model="filter"
        type="search"
        placeholder="Rechercher ..."
        class="mg-y-10"
        :debounce="500"
      ></b-form-input>
      <b-table
        id="table"
        class="table"
        hover
        small
        bordered
        primary-key="id"
        :items="roles"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun rôles"
        show-empty
        :busy="$fetchState.pending"
        :filter="filter"
        @filtered="onFiltered"
      >
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Chargement...</strong>
          </div>
        </template>
        <template #cell(option)="data">
          <a
            v-if="superole !== data.item.name"
            v-can="permissions.edit"
            type="button"
            @click="dialoger(data.item.id)"
          >
            <feather title="modifier" type="edit" size="20" stroke="blue" />
          </a>
        </template>
        <template #cell(created_at)="data">
          {{ $moment(data.item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #empty="scope">
          <h6 class="text-center text-muted pd-y-10">
            {{ scope.emptyText }}
          </h6>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        aria-controls="table"
      ></b-pagination>
      <CreateRoleModal v-if="create" v-model="create" />
      <EditRoleModal v-if="dialog.activate" :id="dialog.id" v-model="dialog.activate" @edited="onEdited" />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateRoleModal from './CreateRoleModal.vue'
import EditRoleModal from './EditRoleModal.vue'
import { SUPERROLE } from '~/helper/constantes'
import { MODULES } from '~/helper/modules-types'
import { role } from '~/helper/permissions'
export default {
  components: { CreateRoleModal, EditRoleModal },
  data: () => ({
    superole: SUPERROLE,
    fields: [
      { key: 'name', label: 'Nom', tdClass: 'wd-30p', sortable: true },
      { key: 'created_at', label: 'Créer le', tdClass: 'wd-10p', sortable: true },
      {
        key: 'option',
        label: 'Options',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
    ],
    dialog: { id: 0, activate: false },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
    create: false,
    permissions: role,
  }),
  async fetch() {
    try {
      await this.getAll()
      this.totalRows = this.roles.length
    } catch (error) {
      this.$bvToast.toast(error.response.data.message, {
        title: 'opération compromise'.toLocaleUpperCase(),
        variant: 'danger',
        solid: true,
      })
    }
  },
  computed: {
    ...mapGetters({ roles: MODULES.ROLE.GETTERS.ROLES }),
  },
  methods: {
    ...mapActions({ getAll: MODULES.ROLE.ACTIONS.ALL }),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    dialoger(id) {
      this.dialog.id = id
      this.dialog.activate = true
    },
    onEdited(message) {
      this.$bvToast.toast(message, {
        title: 'succès de la modification'.toLocaleUpperCase(),
        variant: 'success',
        solid: true,
      })
    },
  },
}
</script>
<style></style>
