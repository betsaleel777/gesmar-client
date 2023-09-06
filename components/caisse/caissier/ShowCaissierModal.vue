<template>
  <b-modal v-model="dialog" size="xl" scrollable hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails du caissier {{ caissier.user.name }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="lg">
          <v-expansion-panels v-model="panel" popout focusable tile>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><h6>Calendrier d'attribution des guichets</h6></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-row class="fill-height">
                  <v-col>
                    <v-sheet height="64">
                      <v-toolbar flat>
                        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                          Aujourd'hui
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="$refs.calendar.prev()">
                          <v-icon small> mdi-chevron-left </v-icon>
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="$refs.calendar.next()">
                          <v-icon small> mdi-chevron-right </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar">
                          {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                    </v-sheet>
                    <v-sheet height="700">
                      <v-calendar
                        ref="calendar"
                        v-model="focus"
                        locale="fr-FR"
                        color="primary"
                        :weekdays="weekday"
                        :events="events"
                        type="month"
                        @click:event="deleteItem"
                        @click:more="viewDay"
                        @click:date="viewDay"
                      ></v-calendar>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-row justify="center">
            <v-dialog v-model="dialogDelete" persistent max-width="450">
              <v-card>
                <v-card-title class="text-h6 error--text">Confirmation d'annulation ?</v-card-title>
                <v-card-text>
                  Voulez-vous réelement supprimer l'attribution du guichet
                  {{ editedItem.name }} pour la date du
                  {{ $moment(editedItem.date).format('DD-MM-YYYY') }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="dialogDelete = false"> abandonner </v-btn>
                  <v-btn color="primary darken-1" text @click="remove"> accepter </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </b-overlay>
      </v-app>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    caissierId: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    focus: '',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    panel: 0,
    editedItem: {
      name: null,
      jour: null,
    },
    dialogDelete: false,
    caissier: {
      user: { name: '' },
      attributions: [],
    },
  }),
  async fetch() {
    const { caissier } = await this.getOne(this.caissierId)
    this.caissier = caissier
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    events() {
      return this.caissier.attributions.map(({ guichet_id: guichet, code, id, date }) => {
        return { id, guichet, start: date, end: date, name: code, timed: true }
      })
    },
  },
  methods: {
    ...mapActions({
      desattribuer: 'caisse/caissier/desattribuer',
      getOne: 'caisse/caissier/getOne',
    }),
    deleteItem({ event }) {
      this.editedItem = Object.assign({}, event)
      this.dialogDelete = true
    },
    remove() {
      this.desattribuer(this.editedItem.id).then(({ message }) => {
        this.$root.$bvToast.toast(message, {
          title: "succès de l'annulation".toLocaleUpperCase(),
          variant: 'success',
          solid: true,
        })
        this.dialogDelete = false
        this.dialog = false
      })
    },
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
  },
}
</script>

<style></style>
