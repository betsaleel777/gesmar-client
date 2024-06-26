<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Attribuer guichet au caissier {{ caissier.user.name }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
          <v-form>
            <v-autocomplete
              v-model="marche"
              :items="marches"
              item-text="nom"
              item-value="id"
              outlined
              dense
              @change="getGuichets"
            >
              <template #label> Choix du marche </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="attribution.guichet_id"
              :items="setGuichets"
              item-text="nom"
              item-value="id"
              outlined
              dense
              :error="errors.guichet_id.exist"
              :error-messages="errors.guichet_id.message"
              :loading="loading"
            >
              <template #label>
                Choix du guichet
                <span class="red--text"><strong>* </strong></span>
              </template>
              <template #progress>
                <v-progress-linear v-if="loading" indeterminate color="primary" absolute></v-progress-linear>
              </template>
            </v-autocomplete>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="attribution.dates"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-combobox
                  v-model="attribution.dates"
                  multiple
                  chips
                  small-chips
                  label="Dates d'attribution"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  :error="errors.dates.exist"
                  :error-messages="errors.dates.message"
                  v-bind="attrs"
                  :disabled="!enableDate"
                  v-on="on"
                >
                  <template #label>
                    Dates d'attribution <span class="red--text"><strong>* </strong></span>
                  </template>
                </v-combobox>
              </template>
              <v-date-picker
                v-model="attribution.dates"
                locale="fr"
                no-title
                multiple
                scrollable
                color="primary"
                :allowed-dates="allowedDates"
              >
                <v-spacer></v-spacer>
                <v-btn text color="warning" @click="menu = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(attribution.dates)"> OK </v-btn>
              </v-date-picker>
            </v-menu>
          </v-form>
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
import { mapActions, mapGetters } from 'vuex'
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: {
    caissierId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    menu: null,
    marche: null,
    loading: false,
    setGuichets: [],
    attribution: {
      guichet_id: null,
      dates: null,
      caissier_id: null,
    },
    caissier: {
      user: { name: '' },
    },
    errors: {
      guichet_id: { exist: false, message: null },
      dates: { exist: false, message: null },
    },
  }),
  async fetch() {
    try {
      await this.getSites()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
    const { caissier } = await this.getOne(this.caissierId)
    this.caissier = caissier
  },
  computed: {
    ...mapGetters({
      marches: MODULES.SITE.GETTERS.SITES,
      guichets: MODULES.GUICHET.GETTERS.GUICHETS,
    }),
    enableDate() {
      return Boolean(this.attribution.guichet_id)
    },
  },
  methods: {
    ...mapActions({
      getSites: MODULES.SITE.ACTIONS.ALL,
      allGuichets: MODULES.GUICHET.ACTIONS.ALL,
      attribuer: MODULES.CAISSIER.ACTIONS.ATTRIBUTE,
      getOne: MODULES.CAISSIER.ACTIONS.ONE,
    }),
    save() {
      this.submiting = true
      this.attribution.caissier_id = this.caissier.id
      this.attribuer(this.attribution)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
    getGuichets() {
      if (this.marche) {
        this.loading = true
        this.allGuichets().then(() => {
          this.setGuichets = this.guichets.filter(({ site_id: id }) => id === this.marche)
          this.loading = false
        })
      }
    },
    allowedDates(val) {
      const dates = this.caissier.attributions.map(({ date }) => date)
      return !dates.includes(val)
    },
  },
}
</script>
<style></style>
