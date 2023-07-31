<template>
  <div>
    <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
      <b-card aria-hidden="true" header="Liste des rôles">
        <b-card-text>
          <div class="btn-toolbar d-flex flex-row-reverse">
            <div class="">
              <feather
                v-b-tooltip.hover.top
                title="créer"
                class="btn btn-sm btn-primary btn-icon"
                stroke-width="2"
                size="18"
                type="plus"
                @click="$bvModal.show('modalCreateRole')"
              />
              <feather
                v-b-tooltip.hover.top
                title="imprimer liste"
                class="btn btn-sm btn-primary btn-icon"
                stroke-width="2"
                size="18"
                type="printer"
              />
            </div>
          </div>
          <!-- btn-toolbar -->
          <hr class="mg-t-4" />
          <b-form-input
            v-if="totalRows > 0"
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Rechercher"
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
            :filter="filter"
            @filtered="onFiltered"
          >
            <template #cell(option)="data">
              <a type="button" @click="dialoger(data.item.id)">
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
            v-if="totalRows > 0"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="right"
            size="sm"
            aria-controls="table"
          ></b-pagination>
          <CreateRoleModal />
          <EditRoleModal
            v-if="dialog.activate"
            :id="dialog.id"
            v-model="dialog.activate"
            @edited="onEdited"
          />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateRoleModal from './CreateRoleModal.vue'
import EditRoleModal from './EditRoleModal.vue'
export default {
  components: {
    CreateRoleModal,
    EditRoleModal,
  },
  data: () => ({
    fields: [
      { key: 'name', label: 'Nom', tdClass: 'wd-30p', sortable: true },
      {
        key: 'created_at',
        label: 'Créer le',
        tdClass: 'wd-10p',
        sortable: true,
      },
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
  }),
  fetch() {
    this.getAll().then(() => {
      this.totalRows = this.roles.length
    })
  },
  computed: {
    ...mapGetters('user-role/role', ['roles']),
  },
  methods: {
    ...mapActions('user-role/role', ['getAll']),
    imprimer() {},
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    dialoger(id) {
      this.dialog.id = id
      this.dialog.activate = true
      this.$bvModal.show('modalEditRole')
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
