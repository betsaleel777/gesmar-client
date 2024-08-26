<template>
  <ListeBordereaux />
</template>

<script>
import ListeBordereaux from '~/components/finance/bordereau/ListeBordereaux.vue'
export default {
  components: { ListeBordereaux },
  head: {
    title: 'Bordereaux',
    meta: [
      {
        hid: 'Bordereaux',
        name: 'Bordereaux',
        content: 'Liste des bordereaux',
      },
    ],
  },
}
</script>
