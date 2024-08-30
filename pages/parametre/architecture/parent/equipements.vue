<template>
  <ListeEquipement />
</template>

<script>
import ListeEquipement from '~/components/architecture/equipement/ListeEquipement.vue'
export default {
  components: { ListeEquipement },
  head: {
    title: 'Equipements',
    meta: [
      {
        hid: 'Equipements',
        name: 'Equipements',
        content: 'Liste des équipements',
      },
    ],
  },
}
</script>
