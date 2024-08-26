<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)
</script>

<template>
  <a-float-button @click="isModalOpen = true">
    <template #icon>
      <plus-outlined />
    </template>
  </a-float-button>
</template>