<template>
  <ListeFermeture />
</template>

<script>
import ListeFermeture from '~/components/finance/caisse/fermeture/ListeFermeture.vue'
export default {
  components: { ListeFermeture },
  head: {
    title: 'Point de caisse',
    meta: [
      {
        hid: 'Point de caisse',
        name: 'Point de caisse',
        content: 'Liste des points de caisse',
      },
    ],
  },
}
</script>
