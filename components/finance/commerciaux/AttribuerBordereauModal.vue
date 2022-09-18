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
        <v-form>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="attribution.interval"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
            class="mb-5"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="attribution.interval"
                label="Dates d'attribution"
                prepend-icon="mdi-calendar"
                readonly
                :error="errors.jour.exist"
                :error-messages="errors.jour.message"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="attribution.interval" locale="fr" range no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="warning" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(attribution.interval)"> OK </v-btn>
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
                dense
                multiple
                small-chips
                cache-items
                deletable-chips
                :error="errors.zones.exist"
                :error-messages="errors.zones.message"
              >
                <template #label>
                  Choix des zones
                  <span class="red--text"><strong>* </strong></span>
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
                    close
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    @click="data.select"
                    @click:close="supprimer(data.item, attribution.zones)"
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
import { mapActions, mapGetters } from 'vuex'
import { remove } from '~/helper/helpers'
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
    attribution: {
      zones: [],
      interval: null,
      emplacements: [],
      commercial: null,
    },
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
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.attribution.commercial = this.commercial.id
    this.getSites()
    this.getEmplacements()
  },
  methods: {
    ...mapActions({
      getSites: 'architecture/marche/getAll',
      getZonesByMarche: 'architecture/zone/getByMarche',
      getEmplacements: 'architecture/emplacement/getAll',
    }),
    save() {
      this.attribuer(this.attribution)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
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
    },
    filterEmplacements(zone) {
      console.log(zone)
    },
    supprimer(item) {
      remove(item, this.attribution.zones)
    },
    getZones() {
      if (this.marche) {
        this.getZonesByMarche(this.marche).then(({ zones }) => (this.zones = zones))
      }
    },
  },
}
</script>
<style></style>
