<template>
  <!-- content-header -->
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body"></div>
  </div>
  <!-- content-body -->
</template>

<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: { PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Tableau de bord' }],
  }),
}
</script>
