<template>
  <div class="main">
    <div class="el-form-item">
      <div style="margin-right: 10px">{{ description }}</div>
      <el-input v-model="text" size="default" :style="{ width: currentInputWidth }" clearable />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
  name: String,
  type: {
    type: String,
    default: 'text'
  },
  description: String,
  value: [String, Number],
  inputWidth: {
    type: String,
    default: '150px'
  },
  placeholder: String,
  readonly: Boolean,
  disabled: Boolean,
  min: String,
  max: String,
  step: String,
  minlength: Number,
  maxlength: Number
})

const currentDescription = props.description
const currentInputWidth = props.inputWidth
const text: string = defineModel({ default: '' })
</script>

<style lang="scss" scoped>
.main {
  font-size: 14px;
  display: flex;

  .el-form-item {
    margin: 0;
    display: flex;
    align-items: center;
  }

  span {
    width: 100px;
    text-align: center;
    display: inline;
  }
}
</style>
