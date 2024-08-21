<template>
  <ListeZone />
</template>

<script>
import ListeZone from '~/components/architecture/zones/ListeZone.vue'
export default {
  components: { ListeZone },
  head: {
    title: 'Zones',
    meta: [
      {
        hid: 'zones',
        name: 'zones',
        content: 'Liste des zones',
      },
    ],
  },
}
</script>
