<template>
  <ListeMarche />
</template>

<script>
import ListeMarche from '~/components/architecture/marche/ListeMarche.vue'
export default {
  components: { ListeMarche },
  head: {
    title: 'Sites',
    meta: [
      {
        hid: 'Sites',
        name: 'Sites',
        content: 'Liste des Sites',
      },
    ],
  },
}
</script>
