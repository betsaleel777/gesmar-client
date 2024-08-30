<template>
  <ListeCommercial />
</template>

<script>
import ListeCommercial from '~/components/finance/commerciaux/ListeCommercial.vue'
export default {
  components: { ListeCommercial },
  head: {
    title: 'Commerciaux',
    meta: [
      {
        hid: 'Commerciaux',
        name: 'Commerciaux',
        content: 'Liste des commerciaux',
      },
    ],
  },
}
</script>
