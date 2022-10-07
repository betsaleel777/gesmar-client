<template>
  <b-modal
    id="structure"
    title="Structuration automatique de marché"
    scrollable
    size="lg"
    hide-footer
    @show="reset"
  >
    <v-app>
      <v-stepper v-model="step" flat>
        <v-stepper-header>
          <v-stepper-step v-for="(item, key) in steps" :key="key" :complete="step > item.id" :step="item.id">
            {{ item.name }}
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <StepperContentMarche v-if="step === 1" @suivant="onSuivant" />
          </v-stepper-content>

          <v-stepper-content step="2">
            <StepperContentPavillon
              v-if="step === 2"
              :key="marche.key"
              :marche="marche"
              @suivant="onSuivant"
              @precedant="step = step - 1"
            />
          </v-stepper-content>

          <v-stepper-content step="3">
            <StepperContentNiveau
              v-if="step === 3"
              :key="pavillons.key"
              :pavillons="pavillons.liste"
              :marche="marche"
              :interval="pavillons.intervalText"
              @suivant="onSuivant"
              @precedant="step = step - 1"
            />
          </v-stepper-content>

          <v-stepper-content step="4">
            <StepperContentZone
              v-if="step === 4"
              :key="niveaux.key"
              :niveaux="niveaux.liste"
              :marche="marche"
              :interval="niveaux.intervalText"
              @suivant="onSuivant"
              @precedant="step = step - 1"
              @fermer="$bvModal.hide('structure')"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-app>
  </b-modal>
</template>
<script>
import StepperContentMarche from './marche/StepperContentMarche.vue'
import StepperContentNiveau from './niveau/StepperContentNiveau.vue'
import StepperContentPavillon from './pavillon/StepperContentPavillon.vue'
import StepperContentZone from './zones/StepperContentZone.vue'
export default {
  components: {
    StepperContentMarche,
    StepperContentNiveau,
    StepperContentPavillon,
    StepperContentZone,
  },
  data: () => ({
    step: 1,
    steps: [
      { id: 1, name: 'Marchés' },
      { id: 2, name: 'Pavillons' },
      { id: 3, name: 'Niveaux' },
      { id: 4, name: 'Zones' },
    ],
    marche: { id: null, key: false },
    pavillons: { liste: [], key: false, intervalText: null },
    niveaux: { liste: [], key: false, intervalText: null },
  }),
  methods: {
    reset() {
      this.step = 1
    },
    onSuivant({ step, donnees, interval }) {
      if (donnees) {
        this.step = step
        if (step === 2) {
          this.marche = donnees
          this.marche.key = !this.marche.key
        } else if (step === 3) {
          this.pavillons.liste = donnees
          this.pavillons.intervalText = interval
          this.pavillons.key = !this.pavillons.key
        } else if (step === 4) {
          this.niveaux.liste = donnees
          this.niveaux.intervalText = interval
          this.niveaux.key = !this.niveaux.key
        }
      } else {
        this.reset()
      }
    },
  },
}
