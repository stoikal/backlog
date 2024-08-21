<script setup>
import { ref } from 'vue';
import GameSelect from './GameSelect.vue';
import { addItemToList } from '../client/lists';

const props = defineProps({
  listId: String,
  title: String,
  items: Array,
})

const emit = defineEmits(['createSuccess'])

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
</script>

<template>
  <a-card
    :title="props.title"
    style="width: 400px; margin-bottom: 2rem; padding: 0"
    hoverable
  >
    <a-list
      :data-source="props.items"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <s v-if="item.isFinished">{{ item.gameTitle }}</s>
          <span v-else>{{ item.gameTitle }}</span>
        </a-list-item>
      </template>
      <template #footer>
        <!-- <a-list-item> -->
          <template v-if="isInputVisible">
            <a-space>

              <game-select
                v-model:value="selectedGame"
              />
              <a-checkbox
                v-model:checked="isGameFinished"
              >
                finished
              </a-checkbox>
            </a-space>
            <a-space>
              <a-button @click="isInputVisible = false">cancel</a-button>
              <a-button type="primary" @click="handleSubmit">submit</a-button>
            </a-space>
          </template>

          <template v-else>
            <a-button
              type="text"
              block
              @click="showInput"
            >
              +
            </a-button>
          </template>

        <!-- </a-list-item> -->
      </template>
    </a-list>
  </a-card>
</template>