<template>
  <ListeNiveau />
</template>

<script>
import ListeNiveau from '~/components/architecture/niveau/ListeNiveau.vue'
export default {
  components: { ListeNiveau },
  head: {
    title: 'Niveaux',
    meta: [
      {
        hid: 'Niveaux',
        name: 'Niveaux',
        content: 'Liste des niveaux',
      },
    ],
  },
}
</script>
