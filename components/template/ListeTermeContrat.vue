<template>
  <div>
    <div class="mg-y-10">
      <div class="mg-y-10">
        <ListeTermeContratBail :marches="marches" />
      </div>
      <ListeTermesContratAnnexe :marches="marches" />
    </div>
  </div>
</template>

<script>
import ListeTermesContratAnnexe from './annexe/ListeTermesContratAnnexe.vue'
import ListeTermeContratBail from './bail/ListeTermeContratBail.vue'
export default {
  components: {
    ListeTermeContratBail,
    ListeTermesContratAnnexe,
  },
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped></style>
