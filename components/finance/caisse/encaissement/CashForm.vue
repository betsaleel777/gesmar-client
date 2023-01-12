<template>
  <v-container fluid>
    <v-radio-group v-model="payable" row>
      <v-radio label="Espèce" :value="1"></v-radio>
      <v-radio label="Cheque" :value="2"></v-radio>
      <v-radio label="Paiement mobile" :value="3"></v-radio>
    </v-radio-group>
    <div v-if="payable === 1">
      <v-text-field
        readonly
        label="montant à payer"
        :value="ordonnancement.paiements[0].montant"
      ></v-text-field>
      <v-text-field v-model="encaissement.versement" label="montant versé"></v-text-field>
      <v-text-field readonly label="monnaie à rendre"></v-text-field>
    </div>
    <div v-else-if="payable === 2">
      <v-text-field
        readonly
        label="montant à payer"
        :value="ordonnancement.paiements[0].montant"
      ></v-text-field>
      <v-text-field v-model="encaissement.numero" label="mumero du cheque"></v-text-field>
    </div>
    <div v-else></div>
  </v-container>
</template>

<script>
export default {
  props: {
    ordonnancement: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    payable: 1,
  }),
  computed: {
    encaissement: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped></style>
