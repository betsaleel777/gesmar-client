<template>
  <b-modal id="structure" scrollable size="lg" hide-footer @show="reset">
    <v-app>
      <v-stepper v-model="step" flat>
        <v-stepper-header>
          <v-stepper-step
            v-for="(item, key) in steps"
            :key="key"
            :complete="step > item.id"
            :step="item.id"
          >
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
              @suivant="onSuivant"
              @precedant="step = step - 1"
            />
          </v-stepper-content>

          <v-stepper-content step="4">
            <StepperContentZone
              v-if="step === 4"
              :key="niveaus.key"
              :niveaus="niveaus.liste"
              :marche="marche"
              @suivant="onSuivant"
              @precedant="step = step - 1"
            />
          </v-stepper-content>

          <v-stepper-content step="5">
            <StepperContentEmplacement
              v-if="step === 5"
              :key="zones.key"
              :zones="zones.liste"
              :marche="marche"
              @suivant="onSuivant"
              @precedant="step = step - 1"
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
import StepperContentEmplacement from './emplacement/StepperContentEmplacement.vue'
export default {
  components: {
    StepperContentMarche,
    StepperContentNiveau,
    StepperContentPavillon,
    StepperContentZone,
    StepperContentEmplacement,
  },
  data: () => ({
    step: 1,
    steps: [
      { id: 1, name: 'Marchés' },
      { id: 2, name: 'Pavillons' },
      { id: 3, name: 'Niveaux' },
      { id: 4, name: 'Zones' },
      { id: 5, name: 'Emplacements' },
    ],
    marche: { id: null, key: false },
    pavillons: { liste: [], key: false },
    niveaus: { liste: [], key: false },
    zones: { liste: [], key: false },
  }),
  methods: {
    reset() {
      this.step = 1
    },
    onSuivant({ step, donnees }) {
      if (donnees) {
        this.step = step
        if (step === 2) {
          this.marche = donnees
          this.marche.key = !this.marche.key
        } else if (step === 3) {
          this.pavillons.liste = donnees
          this.pavillons.key = !this.pavillons.key
        } else if (step === 4) {
          this.niveaus.liste = donnees
          this.niveaus.key = !this.niveaus.key
        } else if (step === 5) {
          this.zones.liste = donnees
          this.zones.key = !this.zones.key
        }
      } else {
        this.reset()
      }
    },
  },
}
</script>
<style></style>
