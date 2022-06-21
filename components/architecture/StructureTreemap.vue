<template>
  <div id="treemap" style="width: 900px; height: 400px"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { TreemapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TitleComponent, TooltipComponent, TreemapChart, CanvasRenderer])
export default {
  props: {
    structure: {
      type: Array,
      required: true,
    },
  },
  computed: {
    option() {
      return {
        title: {
          text: 'Structure des marchés gérés',
          x: 'center',
        },
        tooltip: {},
        series: [
          {
            type: 'treemap',
            name: 'marchés',
            data: this.structure,
            leafDepth: 1,
            roam: false,
          },
        ],
      }
    },
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart = echarts.init(document.getElementById('treemap'))
      myChart.setOption(this.option)
    },
  },
}
</script>
