<template>
  <b-modal v-model="dialog" hide-footer scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">
        Bordereau {{ bordereau.code }} emplacement {{ emplacement.code }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
          <v-date-picker
            outlined
            full-width
            :show-current="day"
            readonly
            :min="min"
            :max="max"
            locale="fr"
            no-title
            scrollable
            color="primary"
            :events="events"
          >
          </v-date-picker>
        </b-overlay>
      </v-app>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { MODULES } from '~/helper/modules-types'
export default {
  props: {
    emplacement: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  async fetch() {
    const payload = { emplacement: this.emplacement.id, bordereau: this.bordereau.id }
    await this.getCollectes(payload)
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
    day() {
      return this.$moment(this.bordereau.jour, 'DD-MM-YYYY').format('YYYY-MM-DD')
    },
    min() {
      return this.$moment(this.day).subtract(15, 'd').format('YYYY-MM-DD')
    },
    max() {
      return this.$moment(this.day).add(15, 'd').format('YYYY-MM-DD')
    },
    ...mapGetters({
      daysCollected: MODULES.COLLECTE.GETTERS.DAYS_COLLECTED,
      bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU,
    }),
  },
  methods: {
    ...mapActions({ getCollectes: MODULES.COLLECTE.ACTIONS.COLLECTED }),
    events(date) {
      const today = this.$moment().format('YYYY-MM-DD')
      if (
        this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY')) &&
        this.$moment().isBefore(date)
      )
        return '#00f'
      if (
        !this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY')) &&
        this.$moment(date).isBetween(this.day, today, undefined, '[)')
      )
        return 'red'
      if (this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY'))) return 'green'
    },
  },
}
</script>

<style scoped></style>
