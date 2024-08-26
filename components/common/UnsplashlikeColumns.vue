<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps({
  items: Array,
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const columnCount = computed(() => {
  let count = 1

  if (breakpoints.greaterOrEqual('lg').value) {
    count = 3
  } else if (breakpoints.greaterOrEqual('sm').value) {
    count = 2
  }

  return count
})

const listsColumns = computed(() => {
  let divider = columnCount.value;
  let columns = []

  props.items.forEach((item, itemIndex) => {
    const columnIndex = itemIndex % divider

    if (columns[columnIndex]) {
      columns[columnIndex].push(item)
    } else {
      columns[columnIndex] = [item]
    }
  })

  return columns
})
</script>

<template>
  <a-row :gutter="24">
    <template
      v-for="(col, index) in listsColumns"
      :key="index"
    >
      <a-col :span="24 / columnCount">
        <template
          v-for="(item, itemIndex) in col"
          :key="itemIndex"
        >
          <slot name="renderItem" :item="item"></slot>
        </template>
      </a-col>
    </template>
  </a-row>
</template>