<template>
  <div>
    <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
      <b-card aria-hidden="true" header="Utilisateurs Archivées">
        <b-card-text>
          <div class="btn-toolbar d-flex flex-row-reverse">
            <div class="">
              <feather
                v-b-tooltip.hover.top
                title="imprimer liste"
                class="btn btn-sm btn-primary btn-icon"
                stroke-width="2"
                size="18"
                type="printer"
              />
              <feather
                v-b-tooltip.hover.top
                title="retour"
                class="btn btn-sm btn-primary btn-icon"
                stroke-width="2"
                size="18"
                type="arrow-left"
                @click="$emit('back')"
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
            placeholder="Type to Search"
            class="mg-y-10"
          ></b-form-input>
          <b-table
            id="table"
            class="table"
            hover
            small
            bordered
            primary-key="id"
            :current-page="currentPage"
            :per-page="perPage"
            :items="users"
            :fields="fields"
            responsive
            empty-text="Aucun utilisateurs archivés"
            show-empty
            :filter="filter"
            :filter-debounce="500"
            @filtered="onFiltered"
          >
            <template #cell(option)="data">
              <nuxt-link :to="`/parametre/utilisateur/${data.item.id}/settings`">
                <feather title="parametres" type="settings" class="mr-auto" size="20" />
              </nuxt-link>
              <feather
                title="restaurer"
                type="rotate-cw"
                size="20"
                stroke="green"
                stroke-width="3"
                @click="dialoger(data.item)"
              />
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
            align="fill"
            size="sm"
            class="mg-y-1"
            aria-controls="table"
          ></b-pagination>
          <ConfirmationModal
            :id="dialogData.id"
            :key="dialogData.modal"
            v-model="dialogData.modal"
            :nom="dialogData.nom"
            action="user-role/user/restaurer"
            :message="`Voulez vous réelement restaurer l'utilisateur ${dialogData.nom}`"
            @confirmed="$emit('back')"
          />
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmationModal from '../tools/ConfirmationModal.vue'
export default {
  components: {
    ConfirmationModal,
  },
  data: () => ({
    fields: [
      { key: 'name', label: 'Nom', tdClass: 'wd-30p', sortable: true },
      { key: 'email', label: 'Email', tdClass: 'wd-30p', sortable: true },
      {
        key: 'deleted_at',
        label: 'Archivé le',
        tdClass: 'wd-20p',
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
  fetch() {
    this.getTrashAll().then(() => {
      this.totalRows = this.users.length
    })
  },
  computed: {
    ...mapGetters('user-role/user', ['users']),
  },
  methods: {
    ...mapActions('user-role/user', ['getTrashAll']),
    imprimer() {},
    dialoger({ id, name }) {
      this.dialogData.nom = name
      this.dialogData.id = id
      this.dialogData.modal = true
      this.$bvModal.show('modal')
    },
  },
  onFiltered(filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length
    this.currentPage = 1
  },
}
</script>
<style></style>
