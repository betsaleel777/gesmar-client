<template>
  <ListeFactureEquipement />
</template>

<script>
import ListeFactureEquipement from '~/components/finance/facture/equipement/ListeFactureEquipement.vue'
export default {
  components: { ListeFactureEquipement },
  head: {
    title: "Factures d'équipement",
    meta: [
      {
        hid: 'Factures equipement',
        name: 'Factures equipement',
        content: "Liste des factures d'equipement",
      },
    ],
  },
}
</script>
