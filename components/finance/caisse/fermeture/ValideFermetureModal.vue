<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Valider le Point de caisse</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12" sm="4">
              <v-text-field
                class="pa-1"
                readonly
                :value="fermeture.total"
                outlined
                dense
                label="Montant encaissé:"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                class="pa-1"
                readonly
                :value="toCashed"
                outlined
                dense
                label="Montant à percevoir:"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                class="pa-1"
                readonly
                :value="loss"
                outlined
                dense
                label="Relicat:"
              ></v-text-field>
            </v-col>
            <v-col v-if="activeReasonField" cols="12" sm="12">
              <v-textarea
                v-model="point.raison"
                class="pa-1"
                outlined
                dense
                :error="errors.raison.exist"
                :error-messages="errors.raison.message"
              >
                <template #label>
                  Label
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-textarea>
            </v-col>
          </v-row>
        </v-container>
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
import { mapActions } from 'vuex'
import { errorHandling } from '~/helper/helpers'
import { MODULES } from '~/helper/modules-types'
import modal from '~/mixins/modal'

export default {
  mixins: [modal],
  props: {
    fermeture: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    point: {
      id: null,
      montant_encaisse: 0,
      montant_apercevoir: 0,
      perte: 0,
      raison: null,
    },
    errors: { raison: { exist: false, message: null } },
  }),
  computed: {
    toCashed() {
      let total = 0
      this.fermeture.encaissements.forEach(({ payable }) => {
        const montant = payable.montant ?? payable.valeur
        total += montant
      })
      return total
    },
    loss() {
      return this.toCashed - this.fermeture.total
    },
    activeReasonField() {
      return this.loss !== 0
    },
  },
  methods: {
    ...mapActions({ valider: MODULES.FERMETURE.ACTIONS.VALIDER }),
    save() {
      this.submiting = true
      this.point.id = this.fermeture.id
      this.point.montant_encaisse = this.fermeture.total
      this.point.montant_apercevoir = this.toCashed
      this.point.perte = this.loss
      this.valider(this.point)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
