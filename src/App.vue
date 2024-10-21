<template>
  <el-container style="width: 100%">
    <el-main style="width: 100%">

      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="表格" name="table">
          <app-table/>
        </el-tab-pane>
        <el-tab-pane label="图表" name="chart">
          <div style="height: 800px">
            <BarChart/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
  <div class="container">
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import AppTable from "./components/AppTable.vue";
import BarChart from "./components/BarChart.vue";

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.container {
  //height: 100vh;
  //width: 100vw;

}
//.demo-tabs > .el-tabs__content {
//  padding: 32px;
//  color: #6b778c;
//  font-size: 32px;
//  font-weight: 600;
//}
</style>
