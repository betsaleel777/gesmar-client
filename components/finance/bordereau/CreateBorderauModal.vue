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
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
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
                  <v-date-picker v-model="attribution.jour" locale="fr" no-title scrollable color="primary">
                    <v-spacer></v-spacer>
                    <v-btn text color="warning" @click="menu = false"> annuler </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(attribution.jour)"> confirmer </v-btn>
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
                  >
                    <template #label>
                      Choix de la zone
                      <span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                </ValidationProvider>
              </v-col>
            </v-row>
            <TableauAttributionEmplacement :key="zoneKey" :zones="zonesSelected" @selected="onSelected" />
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
const ZONE = MODULES.ZONE
const COMMERCIAL = MODULES.COMMERCIAL
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
    this.zones = await this.getZones(this.id)
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
    ...mapGetters({ commercial: COMMERCIAL.GETTERS.COMMERCIAL }),
  },
  methods: {
    ...mapActions({
      getCommercial: COMMERCIAL.ACTIONS.ONE,
      getZones: ZONE.ACTIONS.FOR_ATTRIBUTION,
      attribuer: COMMERCIAL.ACTIONS.ASSIGN,
    }),
    save() {
      this.submiting = true
      this.attribuer(this.attribution)
        .then((message) => {
          this.$bvToast.toast(message, { title: "SUCCES DE L'OPERATION", variant: 'success', solid: true })
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
  },
}
</script>

<style lang="scss" scoped></style>
