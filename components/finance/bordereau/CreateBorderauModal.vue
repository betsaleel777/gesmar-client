<template>
  <b-modal v-model="dialog" size="lg" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Attribuer les emplacements aux commerciaux</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
          <v-autocomplete
            v-model="attribution.commercial_id"
            :items="commerciaux"
            item-text="texte"
            item-value="id"
            outlined
            dense
            :error="errors.commercial_id.exist"
            :error-messages="errors.commercial_id.message"
          >
            <template #label>
              Choix du commercial
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
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
                  <v-text-field
                    v-model="attribution.jour"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
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
                  <v-btn text color="warning" @click="menu = false"> annuler </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(attribution.jour)"> confirmer </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="zonesSelected"
                :items="zones"
                item-text="texte"
                item-value="id"
                outlined
                dense
              >
                <template #label>
                  Choix de la zone
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </b-overlay>
      </v-app>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: { id: { type: Number, required: true }, value: Boolean },
  data: () => ({
    attribution: {
      commercial_id: null,
      jour: null,
      emplacements: [],
    },
    menu: null,
    submiting: false,
    zonesSelected: [],
    emplacementsSelected: [],
    errors: {
      commercial_id: { exist: false, message: null },
      jour: { exist: false, message: null },
    },
  }),
  async fetch() {
    await this.getCommerciaux()
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
    ...mapGetters({ commerciaux: 'finance/commercial/salesman' }),
  },
  methods: {
    ...mapActions({ getCommerciaux: 'finance/commercial/getForSelect' }),
    save() {
      console.log('save running!!!')
    },
  },
}
</script>

<style lang="scss" scoped></style>
