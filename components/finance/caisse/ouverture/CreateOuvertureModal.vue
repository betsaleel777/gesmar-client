<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création d'une ouverture de caisse</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-autocomplete
            v-model="ouverture.guichet_id"
            :items="guichets"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.guichet_id.exist"
            :error-messages="errors.guichet_id.message"
            :loading="loading.guichet"
          >
            <template #label>
              Choix du guichet
              <span class="red--text"><strong>* </strong></span>
            </template>
            <template #progress>
              <v-progress-linear
                v-if="loading.guichet"
                indeterminate
                color="primary"
                absolute
              ></v-progress-linear>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="ouverture.caissier_id"
            :items="caissiers"
            item-text="user"
            item-value="id"
            outlined
            dense
            :error="errors.caissier_id.exist"
            :error-messages="errors.caissier_id.message"
            :loading="loading.caissier"
            @change="getCaissier"
          >
            <template #label>
              Choix du caissier
              <span class="red--text"><strong>* </strong></span>
            </template>
            <template #progress>
              <v-progress-linear
                v-if="loading.caissier"
                indeterminate
                color="primary"
                absolute
              ></v-progress-linear>
            </template>
          </v-autocomplete>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="ouverture.date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
            class="mb-5"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="ouverture.date"
                label="Dates d'ouverture"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                dense
                :error="errors.date.exist"
                :error-messages="errors.date.message"
                v-bind="attrs"
                :disabled="disabled"
                v-on="on"
              >
                <template #label>
                  Dates d'ouverture<span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="ouverture.date"
              :allowed-dates="datesPermises"
              locale="fr"
              no-title
              scrollable
              color="primary"
            >
              <v-spacer></v-spacer>
              <v-btn text color="warning" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(ouverture.date)"> OK </v-btn>
            </v-date-picker>
          </v-menu>
        </v-app>
        <div class="form-group required">
          <label class="form-label">Montant initial de caisse</label>
          <input v-model="ouverture.montant" type="text" class="form-control" />
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button
        type="button"
        :disabled="submiting || noSubmit"
        class="btn btn-primary text-white"
        @click="save"
      >
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
let datesNonPermises = []
export default {
  mixins: [modal],
  props: {
    ouvertures: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    menu: null,
    disabled: true,
    noSubmit: false,
    ouverture: {
      date: '',
      caissier_id: null,
      guichet_id: null,
      montant: null,
    },
    loading: {
      caissier: false,
      guichet: false,
    },
    caissier: null,
    errors: {
      caissier_id: { exist: false, message: null },
      guichet_id: { exist: false, message: null },
      date: { exist: false, message: null },
    },
  }),
  async fetch() {
    try {
      this.loading.guichet = true
      await this.getGuichets()
      this.loading.guichet = false
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
    try {
      this.loading.caissier = true
      this.getCaissiers()
      this.loading.caissier = false
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
  },
  computed: {
    ...mapGetters({
      guichets: MODULES.GUICHET.GETTERS.GUICHETS,
      caissiers: MODULES.CAISSIER.GETTERS.CAISSIERS,
    }),
    guichetCaissier() {
      return `${this.ouverture.guichet_id}|${this.ouverture.caissier_id}`
    },
  },
  watch: {
    guichetCaissier(recent) {
      const [guichet, caissier] = recent.split('|')
      if (guichet !== 'null' && caissier !== 'null') {
        this.activeDate()
      }
    },
    'ouverture.caissier_id'() {
      this.checkExistOuverture()
    },
  },
  methods: {
    ...mapActions({
      ajouter: MODULES.OUVERTURE.ACTIONS.ADD,
      getGuichets: MODULES.GUICHET.ACTIONS.ALL,
      getCaissiers: MODULES.CAISSIER.ACTIONS.FREE,
      getOne: MODULES.CAISSIER.ACTIONS.ONE,
      checkUsing: MODULES.OUVERTURE.ACTIONS.USING_EXISTS,
    }),
    save() {
      this.submiting = true
      this.ajouter(this.ouverture)
        .then(({ message }) => {
          this.dialog = false
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
    getCaissier() {
      this.getOne(this.ouverture.caissier_id).then(({ caissier }) => {
        this.caissier = caissier
      })
    },
    activeDate() {
      datesNonPermises = this.ouvertures
        .filter(
          ({ guichet_id: guichet, caissier_id: caissier }) =>
            guichet === this.ouverture.guichet_id && caissier === this.ouverture.caissier_id
        )
        .map((ouverture) => ouverture.date)
    },
    datesPermises(val) {
      const attributions = this.caissier.attributions.filter(
        ({ guichet_id: id }) => id === this.ouverture.guichet_id
      )
      const datesPermises = attributions.map(({ date }) => date)
      const dates = datesPermises.filter(
        (date) => !datesNonPermises.includes(this.$moment(date).format('DD-MM-YYYY'))
      )
      return dates.includes(val)
    },
    // vérifier si il existe une ouverture en cours pour un caissier et un guichet choisit
    checkExistOuverture() {
      if (this.ouverture.caissier_id) {
        this.checkUsing(this.ouverture).then((exists) => {
          this.disabled = false
          if (exists) {
            this.noSubmit = true
            this.$notify({
              text: `Ce caissier est toujours en cours d'utilisation de sa caisse, veuillez fermer la caisse précedement ouverte avant de créer une autre ouverture de caisse.`,
              title: 'attention',
              type: 'warning',
            })
          } else {
            this.noSubmit = false
          }
        })
      }
    },
  },
}
</script>
<style></style>
