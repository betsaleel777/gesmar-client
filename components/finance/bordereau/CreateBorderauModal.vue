<template>
  <b-modal v-model="dialog" hide-footer size="lg" scrollable>
    <template #modal-header>
      <h5 v-if="commercial.user" id="archiver" class="modal-title text-primary">
        Attribuer les emplacements au commercial {{ commercial.user.name }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="attribution.jour"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                  class="mb-5"
                >
                  <template #activator="{ on, attrs }">
                    <ValidationProvider v-slot="{ errors }" name="jour">
                      <v-text-field
                        v-model="attribution.jour"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        :error-messages="errors"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <template #label>
                          Dates d'attribution<span class="red--text"><strong>* </strong></span>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker
                    v-model="attribution.jour"
                    :min="$moment().startOf('month').format('YYYY-MM-DD')"
                    :max="$moment().endOf('month').format('YYYY-MM-DD')"
                    locale="fr"
                    no-title
                    scrollable
                    color="primary"
                    :allowed-dates="allowedDates"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="warning" @click="menu = false"> annuler </v-btn>
                    <v-btn text color="primary" @click="confirmation"> confirmer </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <ValidationProvider v-slot="{ errors }" name="emplacements">
                  <v-autocomplete
                    v-model="zonesSelected"
                    :items="zones"
                    item-text="texte"
                    item-value="id"
                    outlined
                    dense
                    multiple
                    small-chips
                    deletable-chips
                    attach
                    :error-messages="errors"
                    :disabled="disableZone"
                  >
                    <template #label>
                      Choix de la zone
                      <span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                </ValidationProvider>
              </v-col>
            </v-row>
            <TableauAttributionEmplacement
              :key="zoneKey"
              :infos="infos"
              :zones="zonesSelected"
              @selected="onSelected"
            />
            <v-btn color="primary" :loading="submiting" block @click="handleSubmit(save)"
              >assigner les emplacements</v-btn
            >
          </ValidationObserver>
        </b-overlay>
      </v-app>
    </template>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'
import { MODULES } from '~/helper/modules-types'
import TableauAttributionEmplacement from '~/components/finance/bordereau/TableauAttributionEmplacement.vue'
export default {
  components: { TableauAttributionEmplacement, ValidationObserver, ValidationProvider },
  props: { id: { type: Number, required: true }, value: Boolean },
  data: () => ({
    attribution: {
      jour: null,
      emplacements: [],
    },
    menu: null,
    submiting: false,
    zonesSelected: [],
    zones: [],
  }),
  async fetch() {
    await this.getCommercial(this.id)
    await this.getMonthBordereaux(this.id)
    this.zones = await this.getZones(this.commercial.site_id)
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
    zoneKey() {
      return this.zonesSelected.toString()
    },
    disableZone() {
      return !this.attribution.jour
    },
    infos() {
      return { site: this.commercial.site_id, jour: this.attribution.jour }
    },
    ...mapGetters({
      commercial: MODULES.COMMERCIAL.GETTERS.COMMERCIAL,
      excludedDates: MODULES.COMMERCIAL.GETTERS.DISABLE_DATES,
    }),
  },
  methods: {
    ...mapActions({
      getCommercial: MODULES.COMMERCIAL.ACTIONS.ONE,
      getMonthBordereaux: MODULES.COMMERCIAL.ACTIONS.MONTH_BORDEREAUX,
      getZones: MODULES.ZONE.ACTIONS.FOR_ATTRIBUTION,
      attribuer: MODULES.COMMERCIAL.ACTIONS.ASSIGN,
    }),
    save() {
      this.submiting = true
      this.attribution.commercial_id = this.id
      this.attribuer(this.attribution)
        .then((message) => {
          this.$root.$bvToast.toast(message, {
            title: "SUCCES DE L'OPERATION",
            variant: 'success',
            solid: true,
          })
          this.dialog = false
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            this.$refs.form.setErrors(data.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
    onSelected(selected) {
      this.attribution.emplacements = selected.map(({ id }) => id)
    },
    allowedDates(date) {
      return !this.excludedDates.includes(this.$moment(date).format('DD-MM-YYYY'))
    },
    confirmation() {
      this.$refs.menu.save(this.attribution.jour)
      this.zonesSelected.splice(0)
    },
  },
}
</script>

<style lang="scss" scoped></style>
