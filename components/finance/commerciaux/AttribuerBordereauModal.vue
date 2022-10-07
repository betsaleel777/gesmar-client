<template>
  <b-modal v-model="dialog" size="lg">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Attribuer des emplacements au commercial {{ commercial.user.name }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <v-overlay absolute :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-form>
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
              <v-text-field
                v-model="attribution.jour"
                label="Dates d'attribution"
                prepend-icon="mdi-calendar"
                readonly
                :error="errors.jour.exist"
                :error-messages="errors.jour.message"
                v-bind="attrs"
                v-on="on"
              >
                <template #label>
                  Dates d'attribution<span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
            </template>
            <v-date-picker v-model="attribution.jour" locale="fr" no-title scrollable color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="warning" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="saveDate(attribution.jour)"> OK </v-btn>
            </v-date-picker>
          </v-menu>
          <v-row>
            <v-col cols="5">
              <v-autocomplete
                v-model="marche"
                :items="marches"
                item-text="nom"
                item-value="id"
                outlined
                dense
                :disabled="disabled"
                @change="getZones"
              >
                <template #label> Choix du marche </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="7">
              <v-autocomplete
                v-model="attribution.zones"
                :items="zones"
                item-value="id"
                outlined
                multiple
                dense
                small-chips
                :error="errors.zones.exist"
                :error-messages="errors.zones.message"
                :loading="loading"
                :disabled="disabled"
              >
                <template #label>
                  Choix des zones
                  <span class="red--text"><strong>* </strong></span>
                </template>
                <template #progress>
                  <v-progress-linear
                    v-if="loading"
                    indeterminate
                    color="primary"
                    absolute
                  ></v-progress-linear>
                </template>
                <template #item="{ item, on, attrs }">
                  <v-list-item
                    v-bind="attrs"
                    v-on="on"
                    @click="attrs.inputValue ? supprimer(item) : filterEmplacements(item)"
                  >
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active"></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.code }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
                <template #selection="data">
                  <v-chip
                    v-if="data.index < 3"
                    small
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                  >
                    <span>{{ data.item.code }}</span>
                  </v-chip>
                  <span v-if="data.index === 3" class="grey--text text-caption">
                    (+{{ attribution.zones.length - 3 }} autres)
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
        <v-data-table
          v-model="attribution.emplacements"
          :headers="headers"
          :items="emplacementsByZones"
          item-key="id"
          show-select
          dense
          no-data-text="Aucun emplacement"
        >
        </v-data-table>
      </v-app>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { isNullOrUndefined } from 'url/util'
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    commercial: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    menu: null,
    marche: null,
    zones: [],
    loading: false,
    overlay: false,
    emplacementsByZones: [],
    attribution: {
      zones: [],
      jour: null,
      emplacements: [],
      commercial: null,
    },
    headers: [
      { text: "Code d'emplacement", value: 'code' },
      { text: 'Zone', value: 'zone.nom' },
      { text: 'Niveau', value: 'zone.niveau.nom' },
      { text: 'Pavillon', value: 'zone.niveau.pavillon.nom' },
      { text: 'Type', value: 'type.nom' },
    ],
    errors: {
      zones: { exist: false, message: null },
      jour: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
      emplacements: 'architecture/emplacement/emplacements',
    }),
    validable() {
      return this.attribution.emplacements.length > 0
    },
    emplacementsUsable() {
      if (this.attribution.jour) {
        const notUsables = this.commercial.attributions
          .filter(({ jour }) => this.attribution.jour === jour)
          .map(({ id }) => id)
        return this.emplacements.filter(({ id }) => !notUsables.includes(id))
      } else return this.emplacements
    },
    disabled() {
      return isNullOrUndefined(this.attribution.jour)
    },
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  async mounted() {
    this.overlay = true
    this.attribution.commercial = this.commercial.id
    await this.getSites()
    await this.getEmplacements()
    this.overlay = false
  },
  methods: {
    ...mapActions({
      getSites: 'architecture/marche/getAll',
      getZonesByMarche: 'architecture/zone/getByMarche',
      getEmplacements: 'architecture/emplacement/getAutoAll',
      ajouter: 'finance/attribution/ajouter',
    }),
    save() {
      if (this.validable)
        this.ajouter(this.attribution)
          .then(({ message }) => {
            this.$root.$bvToast.toast(message, {
              title: 'succès de la création'.toLocaleUpperCase(),
              variant: 'success',
              solid: true,
            })
            this.dialog = false
          })
          .catch((err) => {
            const { data } = err.response
            if (data) {
              errorsInitialise(this.errors)
              errorsWriting(data.errors, this.errors)
            }
          })
      else
        this.$bvToast.toast("Aucun emplacement n'as été selectionné", {
          title: "échec de l'opération".toLocaleUpperCase(),
          variant: 'danger',
          solid: true,
        })
    },
    filterEmplacements(zone) {
      this.loading = true
      const calebasse = this.emplacementsUsable.filter(({ zone_id: id }) => zone.id === id)
      this.attribution.emplacements.push(...calebasse)
      this.emplacementsByZones.push(...calebasse)
      this.loading = false
    },
    supprimer(item) {
      this.attribution.emplacements = this.attribution.emplacements.filter(
        ({ zone_id: id }) => id !== item.id
      )
      this.emplacementsByZones = this.emplacementsByZones.filter(({ zone_id: id }) => id !== item.id)
    },
    getZones() {
      if (this.marche) {
        this.loading = true
        this.getZonesByMarche(this.marche).then(({ zones }) => {
          this.zones = zones
          this.loading = false
        })
      }
    },
    saveDate(value) {
      this.$refs.menu.save(value)
      this.marche = null
      this.attribution.zones = []
      this.attribution.emplacements = []
      this.emplacementsByZones = []
    },
  },
}
</script>
<style></style>
