<template>
  <ListeOuverture />
</template>

<script>
import ListeOuverture from '~/components/finance/caisse/ouverture/ListeOuverture.vue'
export default {
  components: { ListeOuverture },
  head: {
    title: 'Ouvertures de caisse',
    meta: [
      {
        hid: 'Ouvertures de caisse',
        name: 'Ouvertures de caisse',
        content: 'Liste des ouvertures de caisse',
      },
    ],
  },
}
</script>
