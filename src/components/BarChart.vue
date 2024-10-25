<script setup lang="ts">
import {use} from 'echarts/core'
import {BarChart} from 'echarts/charts'
import {
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  GridComponent
} from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'
import type {ComposeOption} from 'echarts/core'
import type {BarSeriesOption} from 'echarts/charts'
import type {
  LegendComponentOption,
  TooltipComponentOption,
  DatasetComponentOption,
  GridComponentOption
} from 'echarts/components'

use([
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
])

type EChartsOption = ComposeOption<
    | LegendComponentOption
    | TooltipComponentOption
    | DatasetComponentOption
    | GridComponentOption
    | BarSeriesOption
>
import VChart from 'vue-echarts'
import {computed, onMounted, ref, watchEffect} from "vue";

const props = defineProps({
  dimensions: {
    type: Array,
    default: () => []
  },
  source: {
    type: Array,
    default: () => []
  }
})
const dataSource = computed(() => props.source)
const dataDimensions = computed(() => props.dimensions)

const option = ref(
    {

      legend: {},
      tooltip: {},
      dataset: {
        dimensions: dataDimensions,
        source: dataSource,
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{
        type: 'bar',
        itemStyle: {
          color:'#e6c26c'
        },
        label: {
          show: true,
          position: 'top'
        },
      }]
    }
)

console.log(option)
</script>

<template>
  <div style="width: 100%; height: 100%">
    <v-chart ref="bar" :option="option" autoresize/>
  </div>
</template>

<style scoped>

</style>
