<script setup lang="ts">

import {onMounted} from "vue";
import {getData} from "../api/user.ts";

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
onMounted(
    async () => {
    let result = await getData({})
    }
)
</script>

<template>
    <h2>GSM_2G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN" />
        <el-table-column prop="name" label="Lac" />
        <el-table-column prop="name" label="Bsic"/>
        <el-table-column prop="name" label="Arfcn" />
        <el-table-column prop="name" label="_Rxlev" />
  </el-table>
  <h2>GSM_3G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN" />
    <el-table-column prop="name" label="Lac" />
    <el-table-column prop="name" label="CellID" />
    <el-table-column prop="name" label="Arfcn"/>
    <el-table-column prop="name" label="Psc" />
    <el-table-column prop="name" label="Rscp" />
    <el-table-column prop="name" label="Ecno" />
  </el-table>
  <h2>LTE_4G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN" />
    <el-table-column prop="name" label="CellID" />
    <el-table-column prop="name" label="Pcid" />
    <el-table-column prop="name" label="Arfcn"/>
    <el-table-column prop="name" label="Rsrp" />
    <el-table-column prop="name" label="Rsrq" />
  </el-table>
  <h2>NR_5G_4G_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="PLMN" />
    <el-table-column prop="name" label="Band" />
    <el-table-column prop="name" label="Arfcn"/>
    <el-table-column prop="name" label="Pcid" />
    <el-table-column prop="name" label="Rsrp" />
    <el-table-column prop="name" label="Sinr" />
  </el-table>
  <h2>WIFI_Cell_Info</h2>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="CH" />
    <el-table-column prop="name" label="SSID" />
    <el-table-column prop="name" label="BSSID"/>
    <el-table-column prop="name" label="Indicator" />
  </el-table>
</template>

<style scoped>

</style>
