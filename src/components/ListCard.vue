<script setup>
import { ref } from 'vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import GameSelect from './GameSelect.vue';
import { addItemToList, updateGameStatus, deleteList } from '../client/lists';

const props = defineProps({
  listId: String,
  title: String,
  items: Array,
  hideAddButton: Boolean
})

const emit = defineEmits(['createSuccess', 'updateSuccess', 'deleteSuccess'])

const isInputVisible = ref(false)

const showInput = () => {
  isInputVisible.value = true
}

const selectedGame = ref(null)
const isGameFinished = ref(false)

const handleSubmit = async () => {
  const gameId = selectedGame.value.value
  const isFinished = isGameFinished.value

  await addItemToList(props.listId, { gameId, isFinished })
  selectedGame.value = null
  isGameFinished.value = false
  isInputVisible.value = false
  emit('createSuccess')
}

const handleStatusCheckboxChange = async (item, event) => {
  await updateGameStatus({
    gameId: item.gameId,
    isFinished: event.target.checked,
  })

  emit('updateSuccess')
}

const handleDeleteList = async () => {
  await deleteList(props.listId)

  emit('deleteSuccess')
}
</script>

<template>
  <a-card
    :title="props.title"
    style="margin-bottom: 2rem; padding: 0"
    :bodyStyle="{ padding: 0 }"
    hoverable
  >
    <template #extra>
      <a-popconfirm
        title="Delete?"
        ok-text="Yes"
        cancel-text="No"
        size="large"
        @confirm="handleDeleteList"
      >
        <a-button type="text" shape="circle" :size="size">
          <template #icon>
            <delete-outlined style="color: salmon" />
          </template>
        </a-button>
      </a-popconfirm>
    </template>
  
    <a-list
      :data-source="props.items"
    >
      <template #renderItem="{ item }">
        <a-list-item
          disabled
        >
          <a-space>
            <a-checkbox
              :checked="item.isFinished"
              @change="handleStatusCheckboxChange(item, $event)"
            />
            <s v-if="item.isFinished">{{ item.gameTitle }}</s>
            <span v-else>{{ item.gameTitle }}</span>
          </a-space>
        </a-list-item>
      </template>
      <template #footer>
        <!-- <a-list-item> -->
          <div style="padding: 0 1rem" v-if="!props.hideAddButton">
            <template v-if="isInputVisible">
              <a-space style="margin-bottom: .5rem;">
                <game-select
                  v-model:value="selectedGame"
                />
                <a-checkbox
                  v-model:checked="isGameFinished"
                >
                  finished
                </a-checkbox>
              </a-space>
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
                  @click="showInput"
                  >
                  +
                </a-button>
              </div style="text-align: center;">
            </template>
          </div>

        <!-- </a-list-item> -->
      </template>
    </a-list>
  </a-card>
</template>

<style>
 .ant-checkbox-checked .ant-checkbox-inner {
  background-color: lightgray;
  border-color: lightgray
}
</style>