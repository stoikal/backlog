<script setup>
import { ref } from 'vue'

const emit = defineEmits(['success'])

const isFormOpen = ref(false)

const listTitle = ref('')

const saveList = async () => {
  await $fetch('/api/lists', {
    method: 'POST',
    body: {
      title: listTitle.value
    }
  })

  emit('success')
  listTitle.value = ''
  isFormOpen.value = false
}
</script>

<template>
  <template v-if="isFormOpen">
    <a-space style="margin-top: 1rem;">
      <a-input v-model:value="listTitle"/>
      <a-button type="primary" @click="saveList">
        <template #icon>
          <SaveOutlined />
        </template>
      </a-button>
      <a-button @click="isFormOpen = false">
        <template #icon>
          <CloseOutlined />
        </template>
      </a-button>
    </a-space>
  </template>
  <template v-else>
    <a-button
      type="link"
      @click="isFormOpen = true"
    >
      + list
    </a-button>
  </template>
</template>