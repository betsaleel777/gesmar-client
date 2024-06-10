<template>
  <v-container>
    <p><b>Code</b>: {{ ordonnancement.code }}</p>
    <p><b>Locataire</b>: {{ ordonnancement.personne.fullname }}</p>
    <p><b>Type de contrat</b>: {{ ordonnancement.contrat.type }}</p>
    <p v-if="ordonnancement.emplacement"><b>Emplacement</b>: {{ ordonnancement.emplacement.code }}</p>
    <p v-else><b>Annexe</b>: {{ ordonnancement.annexe.code }}</p>
    <p><b>Montant à payer</b>: {{ ordonnancement.total | currency }}</p>
    <p><b>Période</b>: {{ mois }}</p>
  </v-container>
</template>

<script>
import { FACTURE } from '~/helper/constantes';

export default {
  props: {
    ordonnancement: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mois() {
      return this.ordonnancement.paiements.map(({ facture }) => {
        return facture.type === FACTURE.type.loyer ? this.$moment(facture.periode).format('MMMM') : null
      }).join(', ')
    }
  }
}
</script>

<style scoped></style>
