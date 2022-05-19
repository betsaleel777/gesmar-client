<template>
  <div>
    <PartialSidebar />
    <div class="content">
      <PartialHeader />
      <v-app>
        <nuxt />
      </v-app>
    </div>
  </div>
</template>
<script>
import PartialHeader from '~/components/partials/PartialHeader.vue'
import PartialSidebar from '~/components/partials/PartialSidebar.vue'
export default {
  components: {
    PartialHeader,
    PartialSidebar,
  },
}
</script>
<style></style>
