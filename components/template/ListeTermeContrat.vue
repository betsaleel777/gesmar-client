<template>
  <div class="mg-y-10">
    <div class="mg-y-10">
      <ListeTermeContratBail :marches="marches" />
    </div>
    <!-- <ListeTermesContratAnnexe :marches="marches" /> -->
  </div>
</template>

<script>
import ListeTermeContratBail from './bail/ListeTermeContratBail.vue'
export default {
  components: { ListeTermeContratBail },
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped></style>
