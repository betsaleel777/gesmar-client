<template>
  <ListeRole />
</template>

<script>
import ListeRole from '~/components/role/ListeRole.vue'
export default {
  components: { ListeRole },
  head: {
    title: 'Roles',
    meta: [
      {
        hid: 'Roles',
        name: 'Roles',
        content: 'Liste des rôles',
      },
    ],
  },
}
</script>
