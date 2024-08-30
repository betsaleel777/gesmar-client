<template>
  <ListeCompte />
</template>

<script>
import ListeCompte from '~/components/caisse/compte/ListeCompte.vue'
export default {
  components: { ListeCompte },
  head: {
    title: 'Comptes',
    meta: [
      {
        hid: 'Comptes',
        name: 'Comptes',
        content: 'Liste des comptes',
      },
    ],
  },
}
</script>
