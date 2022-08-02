<template>
  <b-modal
    id="genererGear"
    title="Générer les factures des équipements"
    scrollable
    size="lg"
    hide-footer
    @show="reset"
  >
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
            <StepperContentFormFactureGear
              v-if="step === 1"
              @suivant="onSuivant"
            />
          </v-stepper-content>

          <v-stepper-content step="2">
            <StepperContentListeGenerationGear
              v-if="step === 2"
              :key="factures.key"
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
import StepperContentFormFactureGear from './StepperContentFormFactureGear.vue'
import StepperContentListeGenerationGear from './StepperContentListeGenerationGear.vue'
export default {
  components: {
    StepperContentFormFactureGear,
    StepperContentListeGenerationGear,
  },
  data: () => ({
    step: 1,
    steps: [
      { id: 1, name: 'Formulaire' },
      { id: 2, name: 'Liste des factures' },
    ],
    formulaire: { id: null, key: false },
    factures: { liste: [], key: false, intervalText: null },
  }),
  methods: {
    reset() {
      this.step = 1
    },
    onSuivant({ step, donnees, interval }) {
      if (donnees) {
        this.step = step
        if (step === 2) {
          this.factures.liste = donnees
          this.factures.intervalText = interval
          this.factures.key = !this.factures.key
        }
      } else {
        this.reset()
      }
    },
  },
}
</script>
<style></style>
