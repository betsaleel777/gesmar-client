<template>
  <ListeAnnexe />
</template>

<script>
import ListeAnnexe from '~/components/architecture/annexe/ListeAnnexe.vue'
export default {
  components: { ListeAnnexe },
  head: {
    title: 'Services Annexes',
    meta: [
      {
        hid: 'Services Annexes',
        name: 'Services Annexes',
        content: 'Liste des Services Annexes',
      },
    ],
  },
}
</script>
