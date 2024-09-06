<script setup>
const props = defineProps({
  weekNum: Number,
})
</script>

<template>
  <div>
    <h2>Week {{ props.weekNum }}</h2>

    <a-textarea />
  </div>
</template>