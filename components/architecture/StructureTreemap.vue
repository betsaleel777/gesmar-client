<template>
  <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
    <div v-if="structure.length > 0" id="treemap" style="width: 900px; height: 400px"></div>
  </b-overlay>
</template>

<script>
import * as echarts from 'echarts/core'
import { mapGetters, mapActions } from 'vuex'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { TreemapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TitleComponent, TooltipComponent, TreemapChart, CanvasRenderer])
export default {
  async fetch() {
    await this.getStructure()
    this.drawChart()
  },
  computed: {
    ...mapGetters({ structure: 'architecture/marche/structure' }),
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
  methods: {
    ...mapActions({ getStructure: 'architecture/marche/getGeneralStructure' }),
    drawChart() {
      const myChart = echarts.init(document.getElementById('treemap'))
      myChart.setOption(this.option)
    },
  },
}
</script>
