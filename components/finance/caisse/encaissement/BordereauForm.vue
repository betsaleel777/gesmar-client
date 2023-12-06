<template>
  <v-container>
    <v-text-field
      :value="encaissement.versement"
      readonly
      label="versement bordereau"
      outlined
      dense
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { MODULES } from '~/helper/modules-types'
export default {
  emit: ['setForm'],
  data: () => ({
    encaissement: {
      versement: null,
      montant: null,
      mode: 1,
    },
  }),
  fetch() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'finance/bordereau/SET_BORDEREAU') {
        const bordereau = state.finance.bordereau.bordereau
        this.encaissement.versement = Number(bordereau.total)
        this.encaissement.montant = Number(bordereau.total)
        this.$emit('setForm', this.encaissement)
      }
    })
  },
  computed: {
    ...mapGetters({ bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU }),
  },
}
</script>

<style lang="scss" scoped></style>
