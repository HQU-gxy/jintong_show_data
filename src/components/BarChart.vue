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

const option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1]
    ]
  },
  xAxis: {type: 'category'},
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
}

</script>

<template>
  <div style="width: 100%; height: 100%">
    <v-chart ref="bar" :option="option" autoresize/>
  </div>
</template>

<style scoped>

</style>
