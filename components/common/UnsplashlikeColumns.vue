<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps({
  items: Array,
  customReducer: Function,
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
  const defaultReducer = (columns, item, itemIndex, columnCount) => {
    const columnIndex = itemIndex % columnCount

    if (columns[columnIndex]) {
      columns[columnIndex].push(item)
    } else {
      columns[columnIndex] = [item]
    }

    return columns
  }

  const columns = props.items.reduce((result, item, itemIndex) => {
    const reducer = typeof props.customReducer === 'function'
      ? props.customReducer
      : defaultReducer

    return reducer(result, item, itemIndex, columnCount.value)
  }, [])
  
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