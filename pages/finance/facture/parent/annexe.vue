<template>
  <ListeFactureAnnexe />
</template>

<script>
import ListeFactureAnnexe from '~/components/finance/facture/annexe/ListeFactureAnnexe.vue'
export default {
  components: { ListeFactureAnnexe },
  head: {
    title: 'Factures annexes',
    meta: [
      {
        hid: 'Factures annexe',
        name: 'Factures annexe',
        content: 'Liste des factures annexes',
      },
    ],
  },
}
</script>
