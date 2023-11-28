<template>
  <b-modal v-model="dialog" hide-footer scrollable>
    <template #modal-header>
      <h5 v-if="bordereau.code" id="archiver" class="modal-title text-primary">
        collecter le bordereau {{ bordereau.code }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
          <h5 v-if="bordereauExist" class="text-center">Commercial {{ bordereau.commercial.user.name }}</h5>
          <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <ValidationProvider v-slot="{ errors }" name="emplacement">
              <v-autocomplete
                v-model="collecte.emplacement"
                :items="emplacements"
                item-text="code"
                item-value="id"
                return-object
                outlined
                dense
                :error-messages="errors"
                @change="onChangeEmplacement"
              >
                <template #label>
                  Choix de l'emplacement
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
            </ValidationProvider>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="collecte.jours"
              transition="scale-transition"
              offset-y
              max-width="auto"
              min-width="auto"
              class="mb-2"
            >
              <template #activator="{ on, attrs }">
                <ValidationProvider v-slot="{ errors }" name="jours">
                  <v-text-field
                    v-model="collecte.jours"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    :error-messages="errors"
                    v-bind="attrs"
                    :disabled="disableCollecte"
                    v-on="on"
                  >
                    <template #label>
                      Dates de payement<span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker
                v-model="collecte.jours"
                :min="$moment().subtract(15, 'd').format('YYYY-MM-DD')"
                :max="$moment().add(15, 'd').format('YYYY-MM-DD')"
                locale="fr"
                no-title
                scrollable
                color="primary"
                multiple
                :allowed-dates="allowedDates"
                :events="events"
              >
                <v-spacer></v-spacer>
                <v-btn text color="warning" @click="menu = false"> annuler </v-btn>
                <v-btn text color="primary" @click="confirmation"> confirmer </v-btn>
              </v-date-picker>
            </v-menu>
            <div class="text-right mb-2">
              Le montant total encaissé est de <b>{{ totalCollecte | currency }}</b>
            </div>
            <v-btn color="primary" :loading="submiting" block @click="handleSubmit(save)">valider</v-btn>
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
export default {
  components: { ValidationObserver, ValidationProvider },
  props: { id: { type: Number, required: true }, value: Boolean },
  data() {
    return {
      collecte: {
        bordereau_id: this.id,
        jours: [],
        emplacement: null,
      },
      menu: null,
      emplacements: [],
      submiting: false,
    }
  },
  async fetch() {
    await this.getOne(this.id)
    this.emplacements = this.bordereau.emplacements
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
    ...mapGetters({
      bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU,
      daysCollected: MODULES.COLLECTE.GETTERS.DAYS_COLLECTED,
    }),
    bordereauExist() {
      return Object.keys(this.bordereau).length > 0
    },
    disableCollecte() {
      return !this.collecte.emplacement
    },
    totalCollecte() {
      return this.disableCollecte ? 0 : this.collecte.emplacement.loyer * this.collecte.jours.length
    },
  },
  methods: {
    ...mapActions({
      getOne: MODULES.BORDEREAU.ACTIONS.ONE_COLLECT,
      getCollecte: MODULES.COLLECTE.ACTIONS.COLLECTED,
      ajouter: MODULES.COLLECTE.ACTIONS.ADD,
    }),
    save() {
      this.submiting = true
      this.ajouter(this.collecte)
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
    confirmation() {
      this.$refs.menu.save(this.collecte.jours)
    },
    allowedDates(date) {
      return !this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY'))
    },
    events(date) {
      const today = this.$moment().format('YYYY-MM-DD')
      const bordereauDay = this.$moment(this.bordereau.jour, 'DD-MM-YYYY').format('YYYY-MM-DD')
      if (
        this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY')) &&
        this.$moment().isBefore(date)
      )
        return '#00f'
      if (
        !this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY')) &&
        this.$moment(date).isBetween(bordereauDay, today, undefined, '[)')
      )
        return 'red'
      if (this.daysCollected.includes(this.$moment(date).format('DD-MM-YYYY'))) return 'green'
    },
    onChangeEmplacement() {
      const payload = { emplacement: this.collecte.emplacement.id, bordereau: this.bordereau.id }
      this.getCollecte(payload)
      this.collecte.jours.splice(0)
    },
  },
}
</script>

<style lang="scss" scoped></style>
