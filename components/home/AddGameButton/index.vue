<script setup>
import { ref } from 'vue'
import AddGameForm from "./AddGameForm/index.vue"

const isModalOpen = ref(false)
</script>

<template>
  <a-float-button @click="isModalOpen = true">
    <template #icon>
      <plus-outlined />
    </template>
  </a-float-button>

  <a-modal 
    :open="isModalOpen"
    title="Add Game"
    :footer="false"
    destroy-on-close
    @cancel="isModalOpen = false"
  >
    <AddGameForm />
  </a-modal>
</template>