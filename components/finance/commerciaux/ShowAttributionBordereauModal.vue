<template>
  <b-modal v-model="dialog" scrollable size="lg" hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails du commercial {{ commercial.user.name }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <h6 class="text-center">Emplacements Attribués</h6>
        <v-data-table dense :headers="headers" :items="commercial.emplacements" group-by="code" show-group-by>
          <template #[`item.actions`]="{ item }">
            <v-icon small color="error" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
        <v-row justify="center">
          <v-dialog v-model="dialogDelete" persistent max-width="310">
            <v-card>
              <v-card-title class="text-h6 error--text">Confirmation d'annulation ?</v-card-title>
              <v-card-text>
                Voulez-vous réelement supprimer l'attribution de l'emplacement {{ editedItem.code }} pour la
                date du {{ $moment(editedItem.pivot.jour).format('DD-MM-YYYY') }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" text @click="dialogDelete = false"> abandonner </v-btn>
                <v-btn color="primary darken-1" text @click="remove"> accepter </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-app>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    commercial: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    editedItem: {
      code: null,
      pivot: {
        jour: null,
      },
    },
    dialogDelete: false,
    headers: [
      {
        text: 'Code',
        align: 'start',
        sortable: true,
        value: 'code',
      },
      { text: 'Type', value: 'type.nom', sortable: false, groupable: false },
      { text: 'Date', value: 'pivot.jour', sortable: true },
      { text: 'Superficie(m²)', value: 'superficie', align: 'center', sortable: false, groupable: false },
      { text: 'Annuler', value: 'actions', sortable: false, align: 'right', groupable: false },
    ],
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
  methods: {
    ...mapActions('finance/commercial', ['annuler']),
    deleteItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    remove() {
      this.annuler({
        id: this.commercial.id,
        emplacement: this.editedItem.id,
        jour: this.editedItem.pivot.jour,
      }).then(({ message }) => {
        this.$bvToast.toast(message, {
          title: "succès de l'annulation".toLocaleUpperCase(),
          variant: 'success',
          solid: true,
        })
        this.dialogDelete = false
        this.dialog = false
      })
    },
  },
}
</script>

<style></style>
