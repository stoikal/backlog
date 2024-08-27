<script setup>
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import GameSelect from '../common/GameSelect.vue';

const props = defineProps({
  listId: String,
})

const emit = defineEmits(['success'])

const isInputVisible = ref(false)

const selectedGame = ref(null)

const handleSubmit = async () => {
  const gameId = selectedGame.value.value

  if (gameId) {
    await $fetch('/api/list-items', {
      method: 'POST',
      body: {
        listItems: [{
          listId: props.listId,
          gameId,
        }]
      }
    })

    emit('success')
    selectedGame.value = null
    isInputVisible.value = false
  }
}
</script>

<template>
  <template v-if="isInputVisible">
    <a-flex
      gap="small"
      align="center"
      style="margin-bottom: .5rem; width: 100%;"
    >
      <div style="flex: 1">
        <GameSelect
          v-model:value="selectedGame"
          style="width: 100%"
        />
      </div>
    </a-flex>
    <a-row :gutter="8" justify="end">
      <a-col>
        <a-button @click="isInputVisible = false">cancel</a-button>
      </a-col>
      <a-col>
        <a-button type="primary" @click="handleSubmit">submit</a-button>
      </a-col>
    </a-row>
  </template>
  
  <template v-else>
    <div style="text-align: center;">
      <a-button
        type="text"
        shape="circle"
        size="large"
        @click="isInputVisible = true"
        >
        <plus-outlined style="color: gray"/>
      </a-button>
    </div style="text-align: center;">
  </template>
</template>