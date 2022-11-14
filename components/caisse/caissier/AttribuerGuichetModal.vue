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
            v-model="attribution.guichet"
            :items="setGuichets"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.guichet.exist"
            :error-messages="errors.guichet.message"
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
            >
              <v-spacer></v-spacer>
              <v-btn text color="warning" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(attribution.dates)"> OK </v-btn>
            </v-date-picker>
          </v-menu>
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
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    caissier: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    menu: null,
    marche: null,
    loading: false,
    setGuichets: [],
    attribution: {
      guichet: null,
      dates: null,
      caissier: null,
    },
    errors: {
      guichet: { exist: false, message: null },
      dates: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
      guichets: 'caisse/guichet/guichets',
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
    this.getSites()
  },
  methods: {
    ...mapActions({
      getSites: 'architecture/marche/getAll',
      allGuichets: 'caisse/guichet/getAll',
      ajouter: 'caisse/attribution/ajouter',
    }),
    save() {
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
    saveDates(dates) {},
  },
}
</script>
<style></style>
