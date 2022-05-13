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
            <StepperContentMarche @suivant="step = 2" />
          </v-stepper-content>

          <v-stepper-content step="2">
            <StepperContentPavillon @suivant="step = 3" />
          </v-stepper-content>

          <v-stepper-content step="3">
            <StepperContentNiveau @suivant="step = 4" />
          </v-stepper-content>

          <v-stepper-content step="4">
            <StepperContentZone @suivant="step = 5" />
          </v-stepper-content>

          <v-stepper-content step="5">
            <StepperContentEmplacement @suivant="step = 1" />
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
  }),
  methods: {
    reset() {
      this.step = 1
    },
  },
}
</script>
<style></style>
