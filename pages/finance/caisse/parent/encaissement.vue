<template>
  <ListeEncaissement />
</template>

<script>
import ListeEncaissement from '~/components/finance/caisse/encaissement/ListeEncaissement.vue'
export default {
  components: { ListeEncaissement },
  head: {
    title: 'Encaissements',
    meta: [
      {
        hid: 'Encaissements',
        name: 'Encaissements',
        content: 'Liste des encaissements',
      },
    ],
  },
}
</script>
