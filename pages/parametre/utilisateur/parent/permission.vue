<template>
  <ListePermission />
</template>

<script>
import ListePermission from '~/components/permission/ListePermission.vue'
export default {
  components: { ListePermission },
  head: {
    title: 'Permissions',
    meta: [
      {
        hid: 'Permissions',
        name: 'Permissions',
        content: 'Liste des permissions',
      },
    ],
  },
}
</script>
