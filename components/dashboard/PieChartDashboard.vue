<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: { apexchart: VueApexCharts },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <apexchart type="pie" :options="options.chartOptions" :series="options.series"></apexchart>
</template>

<style scoped></style>
