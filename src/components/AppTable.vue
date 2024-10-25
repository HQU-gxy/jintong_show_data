<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {getData} from "../api/user.ts";
import {testData} from "../../test/test_data.ts";
import {
  DataCell,
  GSM2GCellInfo,
  GSM3GCellInfo,
  GSM4GCellInfo,
  NR5G4GCellInfo,
  WIFI_Cell_Info
} from "../model/entity.ts";
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

const GSM3GCellInfos = ref<GSM3GCellInfo[]>([])
const GSM3GCellChartInfos = ref<any[]>([])
const getGSM3GCellInfos = () => {
  const result: (GSM3GCellInfo | null)[] = new Array(16).fill(null);
  for (const item of rawData) {
    let prefix = item.lable.slice(0, 3);
    let idx = parseInt(item.lable.slice(3, 4), 16)
    if (result[idx] === null) {
      result[idx] = {
        idx: idx,
        PLMN: undefined,
        Lac: undefined,
        CellID: undefined,
        Arfcn: undefined,
        Psc: undefined,
        Rscp: undefined,
        Ecno: undefined,
      };
    }
    if (prefix === '057') {
      result[idx].PLMN = item;
    } else if (prefix === '058') {
      result[idx].Lac = item;
    } else if (prefix === '059') {
      result[idx].CellID = item;
    } else if (prefix === '05A') {
      result[idx].Arfcn = item;
    } else if (prefix === '05B') {
      result[idx].Psc = item;
    } else if (prefix === '05C') {
      result[idx].Rscp = item;
    } else if (prefix === '05D') {
      result[idx].Ecno = item;
    }
  }
  // @ts-ignore can assign
  GSM3GCellInfos.value = result
  GSM3GCellChartInfos.value = result.map(item => ({idx: item?.idx, Rscp: item?.Rscp?.value}))
  console.log(result)

  return result
}

const GSM4GCellInfos = ref<GSM4GCellInfo[]>([])
const GSM4GCellChartInfos = ref<any[]>([])
const getGSM4GCellInfos = () => {
  const result: (GSM4GCellInfo | null)[] = new Array(16).fill(null);
  for (const item of rawData) {
    let prefix = item.lable.slice(0, 3);
    let idx = parseInt(item.lable.slice(3, 4), 16)
    if (result[idx] === null) {
      result[idx] = {
        idx: idx,
        PLMN: undefined,
        CellID: undefined,
        pcid: undefined,
        Arfcn: undefined,
        Rsrp: undefined,
        Rsrq: undefined,
      };
    }
    if (prefix === '05E') {
      result[idx].PLMN = item;
    } else if (prefix === '05F') {
      result[idx].CellID = item;
    } else if (prefix === '060') {
      result[idx].pcid = item;
    } else if (prefix === '061') {
      result[idx].Arfcn = item;
    } else if (prefix === '062') {
      result[idx].Rsrp = item;
    } else if (prefix === '063') {
      result[idx].Rsrq = item;
    }
  }
  // @ts-ignore can assign
  GSM4GCellInfos.value = result
  GSM4GCellChartInfos.value = result.map(item => ({idx: item?.idx, Rsrp: item?.Rsrp?.value}))

  return result
}

const NR5G4GCellInfos = ref<NR5G4GCellInfo[]>([])
const NR5GCellChartInfos = ref<any[]>([])
const getNR5G4GCellInfos = () => {
  const result: (NR5G4GCellInfo | null)[] = new Array(16).fill(null);
  for (const item of rawData) {
    let prefix = item.lable.slice(0, 3);
    let idx = parseInt(item.lable.slice(3, 4), 16)
    if (result[idx] === null) {
      result[idx] = {
        idx: idx,
        PLMN: undefined,
        Band: undefined,
        Arfcn: undefined,
        Pcid: undefined,
        Rsrp: undefined,
        Sinr: undefined,
      };
    }
    if (prefix === '064') {
      result[idx].PLMN = item;
    } else if (prefix === '065') {
      result[idx].Band = item;
    } else if (prefix === '066') {
      result[idx].Arfcn = item;
    } else if (prefix === '067') {
      result[idx].Pcid = item;
    } else if (prefix === '068') {
      result[idx].Rsrp = item;
    } else if (prefix === '069') {
      result[idx].Sinr = item;
    }
  }
  // @ts-ignore can assign
  NR5G4GCellInfos.value = result
  NR5GCellChartInfos.value = result.map(item => ({idx: item?.idx, Rsrp: item?.Rsrp?.value}))

  return result
}

const WIFI_Cell_Infos = ref<WIFI_Cell_Info[]>([])
const WIFI_Cell_ChartInfos = ref<any[]>([])
const getWIFI_Cell_Infos = () => {
  const result: (WIFI_Cell_Info | null)[] = new Array(16).fill(null);
  for (const item of rawData) {
    let prefix = item.lable.slice(0, 3);
    let idx = parseInt(item.lable.slice(3, 4), 16)
    if (result[idx] === null) {
      result[idx] = {
        idx: idx,
        CH: undefined,
        SSID: undefined,
        BSSID: undefined,
        Indicator: undefined,
      };
    }
    if (prefix === '06A') {
      result[idx].CH = item;
    } else if (prefix === '06B') {
      result[idx].SSID = item;
    } else if (prefix === '06C') {
      result[idx].BSSID = item;
    } else if (prefix === '06D') {
      result[idx].Indicator = item;
    }
  }
  // @ts-ignore can assign
  WIFI_Cell_Infos.value = result
  WIFI_Cell_ChartInfos.value = result.map(item => ({idx: item?.idx, Indicator: item?.Indicator?.value}))

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
  getGSM2GCellInfos()
  getGSM3GCellInfos()
  getGSM4GCellInfos()
  getNR5G4GCellInfos()
  getWIFI_Cell_Infos()
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
    <el-table-column prop="idx" label="序号">
      <template #default="scope">
        {{ scope.row.idx + 1 }}
      </template>
    </el-table-column>
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
    <el-table-column prop="timestamp" label="时间">
      <template #default="scope">
        {{ scope.row.PLMN?.timestamp }}
      </template>
    </el-table-column>
  </el-table>

  <h2>GSM_3G_Cell_Info</h2>
  <div style="height: 400px">
    <BarChart :source="GSM3GCellChartInfos"
              :dimensions="['idx', 'Rscp']"></BarChart>
  </div>
  <el-table :data="GSM3GCellInfos" border style="width: 100%">
    <el-table-column prop="idx" label="序号">
      <template #default="scope">
        {{ scope.row.idx + 1 }}
      </template>
    </el-table-column>
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
    <el-table-column prop="CellID" label="CellID">
      <template #default="scope">
        {{ scope.row.CellID?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Arfcn" label="Arfcn">
      <template #default="scope">
        {{ scope.row.Arfcn?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Psc">
      <template #default="scope">
        {{ scope.row.Psc?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Rscp">
      <template #default="scope">
        {{ scope.row.Rscp?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Ecno">
      <template #default="scope">
        {{ scope.row.Ecno?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="timestamp" label="时间">
      <template #default="scope">
        {{ scope.row.PLMN?.timestamp }}
      </template>
    </el-table-column>
  </el-table>


  <h2>LTE_4G_Cell_Info</h2>
  <div style="height: 400px">
    <BarChart :source="GSM4GCellChartInfos"
              :dimensions="['idx', 'Rsrp']"></BarChart>
  </div>
  <el-table :data="GSM4GCellInfos" border style="width: 100%">
    <el-table-column prop="idx" label="序号">
      <template #default="scope">
        {{ scope.row.idx + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="PLMN" label="PLMN">
      <template #default="scope">
        {{ scope.row.PLMN?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="CellID" label="CellID">
      <template #default="scope">
        {{ scope.row.CellID?.value }}
      </template>
    </el-table-column>

    <el-table-column prop="Pcid" label="Pcid">
      <template #default="scope">
        {{ scope.row.Pcid?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Arfcn" label="Arfcn">
      <template #default="scope">
        {{ scope.row.Arfcn?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Rsrp" label="Rsrp">
      <template #default="scope">
        {{ scope.row.Rsrp?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Rsrq" label="Rsrq">
      <template #default="scope">
        {{ scope.row.Rsrq?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="timestamp" label="时间">
      <template #default="scope">
        {{ scope.row.PLMN?.timestamp }}
      </template>
    </el-table-column>
  </el-table>
  <h2>NR_5G_4G_Cell_Info</h2>
  <div style="height: 400px">
    <BarChart :source="NR5GCellChartInfos"
              :dimensions="['idx', 'Rsrp']"></BarChart>
  </div>
  <el-table :data="NR5G4GCellInfos" border style="width: 100%">
    <el-table-column prop="idx" label="序号">
      <template #default="scope">
        {{ scope.row.idx + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="PLMN" label="PLMN">
      <template #default="scope">
        {{ scope.row.PLMN?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Band" label="Band">
      <template #default="scope">
        {{ scope.row.Band?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Arfcn" label="Arfcn">
      <template #default="scope">
        {{ scope.row.Arfcn?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Pcid" label="Pcid">
      <template #default="scope">
        {{ scope.row.Pcid?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Rsrp" label="Rsrp">
      <template #default="scope">
        {{ scope.row.Rsrp?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Sinr" label="Sinr">
      <template #default="scope">
        {{ scope.row.Sinr?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="timestamp" label="时间">
      <template #default="scope">
        {{ scope.row.PLMN?.timestamp }}
      </template>
    </el-table-column>

  </el-table>
  <h2>WIFI_Cell_Info</h2>
   <div style="height: 400px">
    <BarChart :source="WIFI_Cell_ChartInfos"
              :dimensions="['idx', 'Indicator']"></BarChart>
  </div>
  <el-table :data="WIFI_Cell_Infos" border style="width: 100%">
    <el-table-column prop="idx" label="序号">
      <template #default="scope">
        {{ scope.row.idx + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="CH" label="CH">
      <template #default="scope">
        {{ scope.row.CH?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="SSID" label="SSID">
      <template #default="scope">
        {{ scope.row.SSID?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="BSSID" label="BSSID">
      <template #default="scope">
        {{ scope.row.BSSID?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="Indicator" label="Indicator">
      <template #default="scope">
        {{ scope.row.Indicator?.value }}
      </template>
    </el-table-column>
    <el-table-column prop="timestamp" label="时间">
      <template #default="scope">
        {{ scope.row.Indicator?.timestamp }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
