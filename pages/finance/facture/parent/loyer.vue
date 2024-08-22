<template>
  <ListeFactureLoyer />
</template>

<script>
import ListeFactureLoyer from '~/components/finance/facture/loyer/ListeFactureLoyer.vue'
export default {
  components: { ListeFactureLoyer },
  head: {
    title: 'Factures loyer',
    meta: [
      {
        hid: 'Factures loyer',
        name: 'Factures loyer',
        content: 'Liste des factures de loyer',
      },
    ],
  },
}
</script>
