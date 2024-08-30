<template>
  <ListeEmplacement />
</template>

<script>
import ListeEmplacement from '~/components/architecture/emplacement/ListeEmplacement.vue'
export default {
  components: { ListeEmplacement },
  head: {
    title: 'Emplacements',
    meta: [
      {
        hid: 'Emplacements',
        name: 'Emplacements',
        content: 'Liste des emplacements',
      },
    ],
  },
}
</script>
