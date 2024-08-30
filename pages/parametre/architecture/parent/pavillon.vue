<template>
  <ListePavillon />
</template>

<script>
import ListePavillon from '~/components/architecture/pavillon/ListePavillon.vue'
export default {
  components: { ListePavillon },
  head: {
    title: 'Pavillons',
    meta: [
      {
        hid: 'Pavillons',
        name: 'Pavillons',
        content: 'Liste des pavillons',
      },
    ],
  },
}
</script>
