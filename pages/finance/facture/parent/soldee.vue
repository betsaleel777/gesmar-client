<template>
  <ListeFactureSoldee />
</template>

<script>
import ListeFactureSoldee from '~/components/finance/facture/ListeFactureSoldee.vue'
export default {
  components: { ListeFactureSoldee },
  head: {
    title: 'Factures soldées',
    meta: [
      {
        hid: 'Factures soldées',
        name: 'Factures soldées',
        content: 'Liste des emplacements',
      },
    ],
  },
}
</script>
