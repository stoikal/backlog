<script setup>
import { ref } from 'vue'

const emit = defineEmits(['success'])

const isModalOpen = ref(false)

const listTitle = ref("")

const handleOk = async () => {
  await $fetch('/api/lists', {
    method: 'POST',
    body: {
      title: listTitle.value
    }
  })

  isModalOpen.value = false;
  listTitle.value = "";
  emit('success')
}
</script>

<template>
  <a-float-button @click="isModalOpen = true">
    <template #icon>
      <UnorderedListOutlined />
    </template>
  </a-float-button>

  <a-modal
    title="Add List"
    :open="isModalOpen"
    ok-text="Save"
    :ok-button-props="{
      disabled: !listTitle.length
    }"
    @cancel="isModalOpen = false"
    @ok="handleOk"
  >
    <a-form-item
      label="Title"
      :label-col="{ span: 24 }"
    >
      <a-input v-model:value="listTitle"/>
    </a-form-item>
  </a-modal>
</template>