<template>
  <ListeBanque />
</template>

<script>
import ListeBanque from '~/components/caisse/banque/ListeBanque.vue'
export default {
  components: { ListeBanque },
  head: {
    title: 'Banques',
    meta: [
      {
        hid: 'Banques',
        name: 'Banques',
        content: 'Liste des banques',
      },
    ],
  },
}
</script>
