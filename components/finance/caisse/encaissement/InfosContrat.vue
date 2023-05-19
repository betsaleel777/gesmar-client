<template>
  <v-container>
    <p><b>Code</b>: {{ ordonnancement.code }}</p>
    <p><b>Type de contrat</b>: {{ ordonnancement.contrat.type }}</p>
    <p>
      <b>Période</b>: Du {{ $moment(ordonnancement.contrat.debut).format('ll') }} au
      {{ $moment(ordonnancement.contrat.fin).format('ll') }}
    </p>
    <p v-if="ordonnancement.contrat.emplacement">
      <b>Emplacement</b>: {{ ordonnancement.contrat.emplacement.code }}
    </p>
    <p v-else><b>Emplacement</b>: {{ ordonnancement.contrat.annexe.code }}</p>
    <p><b>Locataire</b>: {{ ordonnancement.contrat.personne.alias }}</p>
    <p><b>Montant à payer</b>: {{ ordonnancement.total | currency }}</p>
  </v-container>
</template>

<script>
export default {
  props: {
    ordonnancement: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
