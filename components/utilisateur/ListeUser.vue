<template>
  <b-card aria-hidden="true" header="Liste des utilisateurs ">
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
            @click="$bvModal.show('modalCreateUser')"
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
        :items="users"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive
        empty-text="Aucun utilisateurs"
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
        <template #cell(index)="data"> {{ data.index + 1 }} </template>
        <template #cell(connected)="data">
          <span v-if="data.item.connected" class="badge badge-success-light">connecté</span>
          <span v-else class="badge badge-danger-light">déconnecté</span>
        </template>
        <template #cell(option)="data">
          <nuxt-link :to="`/parametre/utilisateur/${data.item.id}/settings`">
            <feather title="parametres" type="settings" stroke="blue" class="mr-auto" size="20" />
          </nuxt-link>
          <a type="button" @click="dialoger(data.item)">
            <feather title="archiver" type="trash-2" size="20" stroke="red" />
          </a>
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
      <ConfirmationModal
        :id="dialogData.id"
        :key="dialogData.modal"
        v-model="dialogData.modal"
        :nom="dialogData.nom"
        modal-id="userConfirmation"
        action="user-role/user/supprimer"
        :message="`Voulez vous réelement archiver l'utilisateur ${dialogData.nom}`"
      />
      <CreateUserModal />
    </b-card-text>
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '../tools/ConfirmationModal.vue'
import CreateUserModal from './CreateUserModal.vue'
export default {
  components: {
    ConfirmationModal,
    CreateUserModal,
  },
  data: () => ({
    fields: [
      'index',
      { key: 'name', label: 'Nom', tdClass: 'wd-30p', sortable: true },
      { key: 'email', label: 'Email', tdClass: 'wd-30p', sortable: true },
      {
        key: 'connected',
        label: 'Statut',
        tdClass: 'wd-10p text-center',
        thClass: 'wd-10p text-center',
        sortable: false,
      },
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
    dialogData: { modal: false, id: 0, nom: '' },
    filter: null,
    totalRows: 0,
    currentPage: 1,
    perPage: 10,
  }),
  async fetch() {
    await this.getAll()
    this.totalRows = this.users.length
  },
  computed: {
    ...mapGetters('user-role/user', ['users']),
  },
  methods: {
    ...mapActions('user-role/user', ['getAll']),
    imprimer() {},
    dialoger({ id, name }) {
      this.dialogData.nom = name
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('modal')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
<style></style>
