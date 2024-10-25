<script setup lang="ts">

import {computed, onMounted, ref, watchEffect} from "vue";
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
const rawData = testData
const GSM2GCellInfos = ref<GSM2GCellInfo[]>([])
const GSM2GCellChartInfos = ref<any[]>([])
const getGSM2GCellInfos = () => {
  const result: (GSM2GCellInfo | null)[] = new Array(16).fill(null);
  for (const item of apiData.value) {
    let prefix = item.lable.slice(0, 3);
    let idx = parseInt(item.lable.slice(3, 4), 16)
    if (result[idx] === null) {
      result[idx] = {
        idx: idx,
        time: undefined,
        PLMN: undefined,
        Lac: undefined,
        Bsic: undefined,
        Arfcn: undefined,
        Rxlev: undefined,
      };
    }
    const itemTimestamp = new Date(item.timestamp ?? 0);
    let latestTimestamp = result[idx].time ? new Date(result[idx].time) : null;

    // 处理 PLMN
    if (prefix === '051') {
      const existingPLMN = result[idx].PLMN;
      if (!existingPLMN || !existingPLMN.timestamp || itemTimestamp > new Date(existingPLMN.timestamp)) {
        result[idx].PLMN = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Lac
    if (prefix === '052') {
      const existingLac = result[idx].Lac;
      if (!existingLac || !existingLac.timestamp || itemTimestamp > new Date(existingLac.timestamp)) {
        result[idx].Lac = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Bsic
    if (prefix === '053') {
      const existingBsic = result[idx].Bsic;
      if (!existingBsic || !existingBsic.timestamp || itemTimestamp > new Date(existingBsic.timestamp)) {
        result[idx].Bsic = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Arfcn
    if (prefix === '054') {
      const existingArfcn = result[idx].Arfcn;
      if (!existingArfcn || !existingArfcn.timestamp || itemTimestamp > new Date(existingArfcn.timestamp)) {
        result[idx].Arfcn = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Rxlev
    if (prefix === '055') {
      const existingRxlev = result[idx].Rxlev;
      if (!existingRxlev || !existingRxlev.timestamp || itemTimestamp > new Date(existingRxlev.timestamp)) {
        result[idx].Rxlev = item;
        latestTimestamp = itemTimestamp
      }
    }
    result[idx].time = latestTimestamp ? latestTimestamp.toLocaleString() : undefined;
    // if (prefix === '051') {
    //   result[idx].PLMN = item;
    // } else if (prefix === '052') {
    //   result[idx].Lac = item;
    // } else if (prefix === '053') {
    //   result[idx].Bsic = item;
    // } else if (prefix === '054') {
    //   result[idx].Arfcn = item;
    // } else if (prefix === '055') {
    //   result[idx].Rxlev = item;
    // }
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
  for (const item of apiData.value) {
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
    const itemTimestamp = new Date(item.timestamp ?? 0);
    let latestTimestamp = result[idx].time ? new Date(result[idx].time) : null;
    // 处理 PLMN
    if (prefix === '057') {
      const existingPLMN = result[idx].PLMN;
      if (!existingPLMN || !existingPLMN.timestamp || itemTimestamp > new Date(existingPLMN.timestamp)) {
        result[idx].PLMN = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Lac
    if (prefix === '058') {
      const existingLac = result[idx].Lac;
      if (!existingLac || !existingLac.timestamp || itemTimestamp > new Date(existingLac.timestamp)) {
        result[idx].Lac = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 CellID
    if (prefix === '059') {
      const existingCellID = result[idx].CellID;
      if (!existingCellID || !existingCellID.timestamp || itemTimestamp > new Date(existingCellID.timestamp)) {
        result[idx].CellID = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Arfcn
    if (prefix === '05A') {
      const existingArfcn = result[idx].Arfcn;
      if (!existingArfcn || !existingArfcn.timestamp || itemTimestamp > new Date(existingArfcn.timestamp)) {
        result[idx].Arfcn = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Psc
    if (prefix === '05B') {
      const existingPsc = result[idx].Psc;
      if (!existingPsc || !existingPsc.timestamp || itemTimestamp > new Date(existingPsc.timestamp)) {
        result[idx].Psc = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Rscp
    if (prefix === '05C') {
      const existingRscp = result[idx].Rscp;
      if (!existingRscp || !existingRscp.timestamp || itemTimestamp > new Date(existingRscp.timestamp)) {
        result[idx].Rscp = item;
        latestTimestamp = itemTimestamp
      }
    }

    // 处理 Ecno
    if (prefix === '05D') {
      const existingEcno = result[idx].Ecno;
      if (!existingEcno || !existingEcno.timestamp || itemTimestamp > new Date(existingEcno.timestamp)) {
        result[idx].Ecno = item;
        latestTimestamp = itemTimestamp
      }
    }
    // if (prefix === '057') {
    //   result[idx].PLMN = item;
    // } else if (prefix === '058') {
    //   result[idx].Lac = item;
    // } else if (prefix === '059') {
    //   result[idx].CellID = item;
    // } else if (prefix === '05A') {
    //   result[idx].Arfcn = item;
    // } else if (prefix === '05B') {
    //   result[idx].Psc = item;
    // } else if (prefix === '05C') {
    //   result[idx].Rscp = item;
    // } else if (prefix === '05D') {
    //   result[idx].Ecno = item;
    // }
    result[idx].time = latestTimestamp ? latestTimestamp.toLocaleString() : undefined;
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
  for (const item of apiData.value) {
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
    // 解析当前 item 的时间戳
    const itemTimestamp = new Date(item.timestamp ?? 0);

    // 记录最新的时间戳
    let latestTimestamp = result[idx].time ? new Date(result[idx].time) : null;

    // 处理 PLMN
    if (prefix === '05E') {
      const existingPLMN = result[idx].PLMN;
      if (!existingPLMN || !existingPLMN.timestamp || itemTimestamp > new Date(existingPLMN.timestamp)) {
        result[idx].PLMN = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 CellID
    if (prefix === '05F') {
      const existingCellID = result[idx].CellID;
      if (!existingCellID || !existingCellID.timestamp || itemTimestamp > new Date(existingCellID.timestamp)) {
        result[idx].CellID = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 pcid
    if (prefix === '060') {
      const existingPcid = result[idx].pcid;
      if (!existingPcid || !existingPcid.timestamp || itemTimestamp > new Date(existingPcid.timestamp)) {
        result[idx].pcid = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Arfcn
    if (prefix === '061') {
      const existingArfcn = result[idx].Arfcn;
      if (!existingArfcn || !existingArfcn.timestamp || itemTimestamp > new Date(existingArfcn.timestamp)) {
        result[idx].Arfcn = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Rsrp
    if (prefix === '062') {
      const existingRsrp = result[idx].Rsrp;
      if (!existingRsrp || !existingRsrp.timestamp || itemTimestamp > new Date(existingRsrp.timestamp)) {
        result[idx].Rsrp = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Rsrq
    if (prefix === '063') {
      const existingRsrq = result[idx].Rsrq;
      if (!existingRsrq || !existingRsrq.timestamp || itemTimestamp > new Date(existingRsrq.timestamp)) {
        result[idx].Rsrq = item;
        latestTimestamp = itemTimestamp;
      }
    }
    result[idx].time = latestTimestamp ? latestTimestamp.toLocaleString() : undefined;
    // if (prefix === '05E') {
    //   result[idx].PLMN = item;
    // } else if (prefix === '05F') {
    //   result[idx].CellID = item;
    // } else if (prefix === '060') {
    //   result[idx].pcid = item;
    // } else if (prefix === '061') {
    //   result[idx].Arfcn = item;
    // } else if (prefix === '062') {
    //   result[idx].Rsrp = item;
    // } else if (prefix === '063') {
    //   result[idx].Rsrq = item;
    // }
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
  for (const item of apiData.value) {
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
    // 解析当前 item 的时间戳
    const itemTimestamp = new Date(item.timestamp ?? 0);

    // 记录最新的时间戳
    let latestTimestamp = result[idx].time ? new Date(result[idx].time) : null;

    // 处理 PLMN
    if (prefix === '064') {
      const existingPLMN = result[idx].PLMN;
      if (!existingPLMN || !existingPLMN.timestamp || itemTimestamp > new Date(existingPLMN.timestamp)) {
        result[idx].PLMN = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Band
    if (prefix === '065') {
      const existingBand = result[idx].Band;
      if (!existingBand || !existingBand.timestamp || itemTimestamp > new Date(existingBand.timestamp)) {
        result[idx].Band = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Arfcn
    if (prefix === '066') {
      const existingArfcn = result[idx].Arfcn;
      if (!existingArfcn || !existingArfcn.timestamp || itemTimestamp > new Date(existingArfcn.timestamp)) {
        result[idx].Arfcn = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Pcid
    if (prefix === '067') {
      const existingPcid = result[idx].Pcid;
      if (!existingPcid || !existingPcid.timestamp || itemTimestamp > new Date(existingPcid.timestamp)) {
        result[idx].Pcid = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Rsrp
    if (prefix === '068') {
      const existingRsrp = result[idx].Rsrp;
      if (!existingRsrp || !existingRsrp.timestamp || itemTimestamp > new Date(existingRsrp.timestamp)) {
        result[idx].Rsrp = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Rsrq
    if (prefix === '069') {
      const existingRsrq = result[idx].Rsrq;
      if (!existingRsrq || !existingRsrq.timestamp || itemTimestamp > new Date(existingRsrq.timestamp)) {
        result[idx].Rsrq = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Sinr
    if (prefix === '06A') {
      const existingSinr = result[idx].Sinr;
      if (!existingSinr || !existingSinr.timestamp || itemTimestamp > new Date(existingSinr.timestamp)) {
        result[idx].Sinr = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 更新 result[idx].time 为最新的时间戳
    result[idx].time = latestTimestamp ? latestTimestamp.toLocaleString() : undefined;
    // if (prefix === '064') {
    //   result[idx].PLMN = item;
    // } else if (prefix === '065') {
    //   result[idx].Band = item;
    // } else if (prefix === '066') {
    //   result[idx].Arfcn = item;
    // } else if (prefix === '067') {
    //   result[idx].Pcid = item;
    // } else if (prefix === '068') {
    //   result[idx].Rsrp = item;
    // } else if (prefix === '069') {
    //   result[idx].Rsrq = item;
    // } else if (prefix === '06A') {
    //   result[idx].Sinr = item;
    // }
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
  for (const item of apiData.value) {
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
    // 解析当前 item 的时间戳
    const itemTimestamp = new Date(item.timestamp??0);

    // 记录最新的时间戳
    let latestTimestamp = result[idx].time ? new Date(result[idx].time) : null;

    // 处理 CH
    if (prefix === '06B') {
      const existingCH = result[idx].CH;
      if (!existingCH || !existingCH.timestamp || itemTimestamp > new Date(existingCH.timestamp)) {
        result[idx].CH = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 SSID
    if (prefix === '06C') {
      const existingSSID = result[idx].SSID;
      if (!existingSSID || !existingSSID.timestamp || itemTimestamp > new Date(existingSSID.timestamp)) {
        result[idx].SSID = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 BSSID
    if (prefix === '06D') {
      const existingBSSID = result[idx].BSSID;
      if (!existingBSSID || !existingBSSID.timestamp || itemTimestamp > new Date(existingBSSID.timestamp)) {
        result[idx].BSSID = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 处理 Indicator
    if (prefix === '06E') {
      const existingIndicator = result[idx].Indicator;
      if (!existingIndicator || !existingIndicator.timestamp || itemTimestamp > new Date(existingIndicator.timestamp)) {
        result[idx].Indicator = item;
        latestTimestamp = itemTimestamp;
      }
    }

    // 更新 result[idx].time 为最新的时间戳
    result[idx].time = latestTimestamp ? latestTimestamp.toLocaleString() : undefined;
    // if (prefix === '06B') {
    //   result[idx].CH = item;
    // } else if (prefix === '06C') {
    //   result[idx].SSID = item;
    // } else if (prefix === '06D') {
    //   result[idx].BSSID = item;
    // } else if (prefix === '06E') {
    //   result[idx].Indicator = item;
    // }
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
  let result = await getData(stationNo.value, deviceNo.value)
  apiData.value = result
  console.log('search dev')
  getGSM2GCellInfos()
  getGSM3GCellInfos()
  getGSM4GCellInfos()
  getNR5G4GCellInfos()
  getWIFI_Cell_Infos()
}

const refreshMode = ref(0)
const refreshOpt = [
  {label: '手动刷新', value: 0},
  {label: '自动刷新/1s', value: 1},
  {label: '自动刷新/5s', value: 2},
  {label: '自动刷新/10s', value: 3},
]
const searchInterval = ref()
onMounted(() => {
  watchEffect(
      () => {
        clearInterval(searchInterval.value)
        if (refreshMode.value === 1) {
          searchInterval.value = setInterval(searchDev, 1000)
        } else if (refreshMode.value === 2) {
          searchInterval.value = setInterval(searchDev, 5000)
        } else if (refreshMode.value === 3) {
          searchInterval.value = setInterval(searchDev, 10000)
        }
      }
  )
})

</script>

<template>
  <SearchPane @search="searchDev">
    <template v-slot:btn>
      <el-select style="width: 150px" v-model="refreshMode" placeholder="请选择">
        <el-option v-for="item in refreshOpt" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </template>
    <SearchItem>
      <PDInput v-model="stationNo" description="站点号" placeholder="请输入站点号"></PDInput>
    </SearchItem>
    <SearchItem>
      <PDInput v-model="deviceNo" description="设备号" placeholder="请输入设备号"></PDInput>
    </SearchItem>
  </SearchPane>
  <h2>GSM 2G蜂窝信息</h2>
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
        {{ scope.row.time === '1970/1/1 08:00:00' ? '' : scope.row.time }}
      </template>
    </el-table-column>
  </el-table>

  <h2>WCDMA 3G蜂窝信息</h2>
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
        {{ scope.row.time === '1970/1/1 08:00:00' ? '' : scope.row.time }}
      </template>
    </el-table-column>
  </el-table>


  <h2>LTE 4G蜂窝信息</h2>
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
        {{ scope.row.time === '1970/1/1 08:00:00' ? '' : scope.row.time }}
      </template>
    </el-table-column>
  </el-table>
  <h2>NR 5G蜂窝信息</h2>
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
        {{ scope.row.time === '1970/1/1 08:00:00' ? '' : scope.row.time }}
      </template>
    </el-table-column>

  </el-table>
  <h2>WIFI信息</h2>
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
        {{ scope.row.time === '1970/1/1 08:00:00' ? '' : scope.row.time }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
