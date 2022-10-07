<template>
  <b-modal id="modalCreateBordereau" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création de bordereau</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <v-autocomplete
          v-model="bordereau.commercial_id"
          :items="commerciaux"
          outlined
          dense
          item-text="user.name"
          item-value="id"
          :error="errors.commercial_id.exist"
          :error-messages="errors.commercial_id.message"
          @change="filterDates"
        >
          <template #label>
            Commercial
            <span class="red--text"><strong>* </strong></span>
          </template>
        </v-autocomplete>
        <v-autocomplete
          v-model="bordereau.date_attribution"
          :items="dates"
          outlined
          dense
          :error="errors.date_attribution.exist"
          :error-messages="errors.date_attribution.message"
          :append-icon="marker ? 'mdi-calendar-today' : ''"
          @click:append="setToday"
        >
          <template #label>
            Date
            <span class="red--text"><strong>* </strong></span>
          </template>
        </v-autocomplete>
      </v-app>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  data: () => ({
    dates: [],
    marker: true,
    bordereau: {
      commercial_id: null,
      date_attribution: null,
    },
    errors: {
      commercial_id: { exist: false, message: null },
      date_attribution: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters({
      commerciaux: 'finance/commercial/commerciaux',
    }),
  },
  mounted() {
    this.getCommerciaux()
  },
  methods: {
    ...mapActions({
      getCommerciaux: 'finance/commercial/getAll',
      ajouter: 'finance/bordereau/ajouter',
    }),
    save() {
      this.ajouter(this.bordereau)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.$bvModal.hide('modalCreateBordereau')
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
      this.bordereau = {}
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateBordereau')
    },
    filterDates() {
      if (this.bordereau.commercial_id) {
        const commercial = this.commerciaux.find(({ id }) => id === this.bordereau.commercial_id)
        this.bordereau.date_attribution = null
        const datesDistincts = [...new Set(commercial.attributions.map(({ jour }) => jour))]
        const datesUsed = commercial.bordereaux.map(({ date_attribution: date }) => date)
        this.dates = datesDistincts.filter((date) => !datesUsed.includes(date))
      }
    },
    setToday() {
      const now = this.$moment().format('YYYY-MM-DD')
      if (this.dates.includes(now)) {
        this.bordereau.date_attribution = now
        this.marker = false
      } else
        this.$root.$bvToast.toast("Aucun emplacement attribué à ce commercial pour la date d'aujourd'hui", {
          title: 'attention !!'.toLocaleUpperCase(),
          variant: 'warning',
          solid: true,
        })
    },
  },
}
</script>
<style></style>
