<template>
  <b-modal v-model="dialog" size="xl" scrollable hide-footer>
    <template #modal-header>
      <h5 class="modal-title text-primary">Détails du commercial {{ commercial.user.name }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <v-app>
          <v-expansion-panels v-model="panel" popout focusable tile>
            <v-expansion-panel>
              <v-expansion-panel-header
                ><h6>Calendrier d'attribution des emplacements</h6></v-expansion-panel-header
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
                        <v-menu bottom right>
                          <template #activator="{ on, attrs }">
                            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                              <span>{{ typeToLabel[type] }}</span>
                              <v-icon right> mdi-menu-down </v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item @click="type = 'day'">
                              <v-list-item-title>Jour</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                              <v-list-item-title>Semaine</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                              <v-list-item-title>Mois</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
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
                        :type="type"
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
                  Voulez-vous réelement supprimer l'attribution de l'emplacement
                  {{ editedItem.name }} pour la date du
                  {{ $moment(editedItem.jour).format('DD-MM-YYYY') }}
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
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    focus: '',
    type: 'month',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    typeToLabel: {
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
    },
    panel: 0,
    editedItem: {
      name: null,
      jour: null,
    },
    dialogDelete: false,
    commercial: { user: { name: '' } },
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
  async fetch() {
    const { commercial } = await this.getOne(this.id)
    this.commercial = commercial
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
      return this.commercial.attributions
        ? this.commercial.attributions.map(
            ({ id, emplacement_id: emplacement, emplacement: { code }, jour }) => {
              const date = Date.parse(jour)
              return { id, emplacement, start: date, end: date, name: code, timed: true }
            }
          )
        : []
    },
  },
  methods: {
    ...mapActions({ supprimer: 'finance/attribution/supprimer', getOne: 'finance/commercial/getOne' }),
    deleteItem({ event }) {
      this.editedItem = Object.assign({}, event)
      this.dialogDelete = true
    },
    remove() {
      this.supprimer(this.editedItem.id).then(({ message }) => {
        this.$bvToast.toast(message, {
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
