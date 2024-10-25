<template>
  <div>
    <el-collapse-transition>
      <el-card
        v-if="show"
        :shadow="shadow"
      >
        <div class="pane">
          <slot />
          <search-item class="btn-group">
            <slot name="btn" />
            <el-button
                style="margin-left: 10px"
              type="primary"
              size="default"
              @click="emit('search')"
            >
              <i class="el-icon-search" />
              搜索
            </el-button>

            <el-button
                style="margin-left: 10px"
              type="primary"
              size="default"
              @click="emit('reset')"
            >
              <i class="el-icon-refresh-left" />
              重置
            </el-button>
          </search-item>
        </div>
      </el-card>

    </el-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import SearchItem from './SearchItem.vue'
const props = defineProps({
  // always / hover / never
  shadow: {
    type: String,
    default: 'always'
  },
  show: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['search', 'reset'])
</script>

<style scoped>
.pane {
  width: inherit;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: 10px 10px 10px 10px;
  transition: height 0.5s;
}
.btn-group {
  display: flex;
  //flex-direction: row-reverse;
  margin-left: auto;
}
</style>
