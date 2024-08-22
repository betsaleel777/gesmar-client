<template>
  <ListeFactureInitiale />
</template>

<script>
import ListeFactureInitiale from '~/components/finance/facture/initiale/ListeFactureInitiale.vue'
export default {
  components: { ListeFactureInitiale },
  head: {
    title: 'Factures PDP',
    meta: [
      {
        hid: 'Factures PDP',
        name: 'Factures PDP',
        content: 'Liste des factures PDP',
      },
    ],
  },
}
</script>
