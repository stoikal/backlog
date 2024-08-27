<script setup>
import { ref } from 'vue'
import AddGameForm from "./AddGameForm/index.vue"

const emit = defineEmits(['success', 'listSuccess'])

const isModalOpen = ref(false)

const handleAddGameSuccess = () => {
  isModalOpen.value = false
  emit('success')
}
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
    body-style="padding-top: 1rem"
    @cancel="isModalOpen = false"
  >
    <AddGameForm
      @success="handleAddGameSuccess"
      @list-success="emit('listSuccess')"
    />
  </a-modal>
</template>