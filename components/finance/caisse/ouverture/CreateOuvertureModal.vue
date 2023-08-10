<template>
  <b-modal id="modalCreateOuverture" scrollable @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création d'une ouverture de caisse</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
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
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
let datesNonPermises = []
export default {
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
  computed: {
    ...mapGetters({
      guichets: 'caisse/guichet/guichets',
      caissiers: 'caisse/caissier/caissiers',
    }),
    guichetCaissier() {
      return `${this.ouverture.guichet_id}|${this.ouverture.caissier_id}`
    },
  },
  watch: {
    guichetCaissier(recent) {
      const [guichet, caissier] = recent.split('|')
      if (guichet !== 'null' && caissier !== 'null') this.activeDate()
    },
  },
  mounted() {
    this.loading.guichet = true
    this.loading.caissier = true
    this.getGuichets().then(() => {
      this.loading.guichet = false
    })
    this.getCaissiers().then(() => {
      this.loading.caissier = false
    })
  },
  methods: {
    ...mapActions({
      ajouter: 'caisse/ouverture/ajouter',
      getGuichets: 'caisse/guichet/getAll',
      getCaissiers: 'caisse/caissier/getAll',
      getOne: 'caisse/caissier/getOne',
    }),
    save() {
      this.submiting = true
      this.ajouter(this.ouverture)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateOuverture')
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
    reset() {
      this.disabled = true
      this.ouverture = {
        date: '',
        caissier_id: null,
        guichet_id: null,
        montant: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateOuverture')
    },
    getCaissier() {
      this.getOne(this.ouverture.caissier_id).then(({ caissier }) => {
        this.caissier = caissier
      })
    },
    activeDate() {
      this.disabled = false
      datesNonPermises = this.ouvertures
        .filter(
          ({ guichet_id: guichet, caissier_id: caissier }) =>
            guichet === this.ouverture.guichet_id && caissier === this.ouverture.caissier_id
        )
        .map((ouverture) => ouverture.date)
    },
    datesPermises(val) {
      const attributions = this.caissier.attributions.filter(
        ({ pivot: { guichet_id: id } }) => id === this.ouverture.guichet_id
      )
      const datesPermises = attributions.map(({ pivot: { date } }) => date)
      const dates = datesPermises.filter(
        (date) => !datesNonPermises.includes(this.$moment(date).format('DD-MM-YYYY'))
      )
      return dates.includes(val)
    },
  },
}
</script>
<style></style>
