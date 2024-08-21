<template>
  <ListeTypequipement />
</template>

<script>
import ListeTypequipement from '~/components/architecture/typEquipement/ListeTypequipement.vue'
export default {
  components: { ListeTypequipement },
  head: {
    title: "Types d'équipement",
    meta: [
      {
        hid: "Types d'équipement",
        name: "Types d'équipement",
        content: "Liste des Types d'équipement",
      },
    ],
  },
}
</script>
