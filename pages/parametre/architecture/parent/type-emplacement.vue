<template>
  <ListeTypemplacement />
</template>

<script>
import ListeTypemplacement from '~/components/architecture/typEmplacement/ListeTypemplacement.vue'
export default {
  components: { ListeTypemplacement },
  head: {
    title: "Types d'emplacement",
    meta: [
      {
        hid: "Types d'emplacement",
        name: "Types d'emplacement",
        content: "Liste des Types d'emplacement",
      },
    ],
  },
}
</script>
