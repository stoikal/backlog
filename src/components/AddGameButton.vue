<script setup>
import { ref, watch } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue';
import AddGameForm from './AddGameForm.vue';

const isModalOpen = ref(false)

const emit = defineEmits(['success', 'listSucces'])

const handleSuccess = () => {
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
    v-model:open="isModalOpen"
    title="Add Game"
    destroyOnClose
    :footer="false"
  >
    <add-game-form
      @success="handleSuccess"
      @list-success="emit('listSuccess')"
    />
  </a-modal>
</template>
