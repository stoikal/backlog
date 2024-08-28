<script setup>
import { ref } from 'vue'
import AddGameForm from "./AddGameForm/index.vue"

const emit = defineEmits(['success', 'listSuccess'])

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
    :bodyStyle="{ paddingTop: '1rem' }"
    @cancel="isModalOpen = false"
  >
    <AddGameForm
      @close="isModalOpen.value = false"
      @success="emit('success')"
      @list-success="emit('listSuccess')"
    />
  </a-modal>
</template>