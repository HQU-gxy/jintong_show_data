<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {getData} from "../api/user.ts";
import {testData} from "../../test/test_data.ts";
import {DataCell, GSM2GCellInfo} from "../model/entity.ts";
import BarChart from "./BarChart.vue";
import PDInput from "./SearchPane/PDInput.vue";
import SearchPane from "./SearchPane/SearchPane.vue";
import SearchItem from "./SearchPane/SearchItem.vue";

const apiData = ref<DataCell[]>([])
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const rawData = testData
const GSM2GCellInfos = ref<GSM2GCellInfo[]>([])
const GSM2GCellChartInfos = ref<any[]>([])
const getGSM2GCellInfos = () => {
  const result: (GSM2GCellInfo | null)[] = new Array(16).fill(null);
  for (const item of rawData) {
    let prefix = item.lable.slice(0, 3);
    let idx = parseInt(item.lable.slice(3, 4), 16)
    if (result[idx] === null) {
      result[idx] = {
        idx: idx,
        PLMN: undefined,
        Lac: undefined,
        Bsic: undefined,
        Arfcn: undefined,
        Rxlev: undefined,
      };
    }
    if (prefix === '051') {
      result[idx].PLMN = item;
    } else if (prefix === '052') {
      result[idx].Lac = item;
    } else if (prefix === '053') {
      result[idx].Bsic = item;
    } else if (prefix === '054') {
      result[idx].Arfcn = item;
    } else if (prefix === '055') {
      result[idx].Rxlev = item;
    }
  }
  // @ts-ignore can assign
  GSM2GCellInfos.value = result
  GSM2GCellChartInfos.value = result.map(item => ({idx: item?.idx, RxLev: item?.Rxlev?.value}))

  return result
}

const stationNo = ref('')
const deviceNo = ref('')
onMounted(
    async () => {
      // let result = await getData({
      //   tableCategory: '2',
      //   stationNo: '20241019',
      //   deviceNo: 'ff',
      //   order: 'ff',
      // })
      // console.log(result)
      // console.log(result)
    }
)
const searchDev = async () => {
  // let result = await getData(stationNo.value, deviceNo.value)
  // apiData.value = result
  getGSM2GCellInfos() || []
}
</script>

<template>
  <SearchPane @search="searchDev">
    <SearchItem>
      <PDInput v-model="stationNo" description="站点号" placeholder="请输入站点号"></PDInput>
    </SearchItem>
    <SearchItem>
      <PDInput v-model="deviceNo" description="设备号" placeholder="请输入设备号"></PDInput>
    </SearchItem>
  </SearchPane>
  <h2>GSM_2G_Cell_Info</h2>
  <div style="height: 400px">
    <BarChart :source="GSM2GCellChartInfos"
              :dimensions="['idx', 'RxLev']"></BarChart>
  </div>
  <el-table :data="GSM2GCellInfos" border style="width: 100%">
    <el-table-column prop="PLMN" label="PLMN">
      <template #default="scope">
        {{ scope.row.PLMN?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Lac" label="Lac">
      <template #default="scope">
        {{ scope.row.Lac?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Bsic" label="Bsic">
      <template #default="scope">
        {{ scope.row.Bsic?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Arfcn" label="Arfcn">
      <template #default="scope">
        {{ scope.row.Arfcn?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="_Rxlev">
      <template #default="scope">
        {{ scope.row.Rxlev?.value }}
      </template>
    </el-table-column>
  </el-table>

  <h2>GSM_3G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN"/>
    <el-table-column prop="name" label="Lac"/>
    <el-table-column prop="name" label="CellID"/>
    <el-table-column prop="name" label="Arfcn"/>
    <el-table-column prop="name" label="Psc"/>
    <el-table-column prop="name" label="Rscp"/>
    <el-table-column prop="name" label="Ecno"/>
  </el-table>
  <h2>LTE_4G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN"/>
    <el-table-column prop="name" label="CellID"/>
    <el-table-column prop="name" label="Pcid"/>
    <el-table-column prop="name" label="Arfcn"/>
    <el-table-column prop="name" label="Rsrp"/>
    <el-table-column prop="name" label="Rsrq"/>
  </el-table>
  <h2>NR_5G_4G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN"/>
    <el-table-column prop="name" label="Band"/>
    <el-table-column prop="name" label="Arfcn"/>
    <el-table-column prop="name" label="Pcid"/>
    <el-table-column prop="name" label="Rsrp"/>
    <el-table-column prop="name" label="Sinr"/>
  </el-table>
  <h2>WIFI_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="CH"/>
    <el-table-column prop="name" label="SSID"/>
    <el-table-column prop="name" label="BSSID"/>
    <el-table-column prop="name" label="Indicator"/>
  </el-table>
</template>

<style scoped>

</style>
