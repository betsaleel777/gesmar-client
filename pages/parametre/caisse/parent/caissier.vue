<template>
  <ListeCaissier />
</template>

<script>
import ListeCaissier from '~/components/caisse/caissier/ListeCaissier.vue'
export default {
  components: { ListeCaissier },
  head: {
    title: 'Caissiers',
    meta: [
      {
        hid: 'Caissiers',
        name: 'Caissiers',
        content: 'Liste des caissiers',
      },
    ],
  },
}
</script>
