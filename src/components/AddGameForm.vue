<script setup>
import { computed, ref, watch } from 'vue'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { createList, getLists, getListsContainingGame, deleteListItems, createListItems } from '../client/lists';
import GameSelect from './GameSelect.vue';

const emit = defineEmits(['success', 'listSuccess'])

const allList = ref([])

const loadLists = () => {
  getLists()
    .then((res) => {
      allList.value = res.data
    })
}

loadLists()

const checkboxOptions = computed(() => {
  return allList.value.map((list) => ({
    label: list.title,
    value: list.id
  }))
})

const selectedGame = ref(null)
const selectedLists = ref([])
const listsContainingGame = ref([])

watch(() => selectedGame.value?.value, (gameId) => {
  getListsContainingGame(gameId)
    .then((res) => {
      const listIds = res.data.map((list) => list.id)

      selectedLists.value = listIds
      listsContainingGame.value = listIds
    })
})

const submit = async () => {
  const gameId = selectedGame.value?.value
  
  if (gameId) {
    const toCreate = selectedLists.value
    const toDelete = listsContainingGame.value
      .filter((list) => {
        return !selectedLists.value.includes(list)
      })
    
    await deleteListItems(gameId, toDelete)
    await createListItems(toCreate.map((listId) => ({
      gameId,
      listId,
    })))

    emit('success')
  }
}

const isListFormShown = ref(false)
const listTitle = ref('')

const saveList = async () => {
  await createList({ title: listTitle.value })

  isListFormShown.value = false
  listTitle.value = ''
  loadLists()
  emit('listSuccess')
}
</script>

<template>
  <div style="padding: 1rem;">
    <a-form-item>
      <game-select
        v-model:value="selectedGame"
        style="max-width: 300px; width: 100%"
      />
      <div style="padding: .5rem .8rem;">
        <div>
          {{ selectedGame?.option.game.genres?.split('||').join(', ') }}
        </div>
        <div>
          {{ selectedGame?.option.game.platforms?.split('||').join(', ') }}
        </div>
        <div>
          {{ selectedGame?.option.game.released }}
        </div>
      </div>
    </a-form-item>

    <a-checkbox-group
      v-model:value="selectedLists"
      :options="checkboxOptions"
    />

    <template v-if="isListFormShown">
      <a-space style="margin-top: 1rem;">
        <a-input v-model:value="listTitle"/>
        <a-button type="primary" @click="saveList">
          <template #icon>
            <SaveOutlined />
          </template>
        </a-button>
        <a-button @click="isListFormShown = false">
          <template #icon>
            <CloseOutlined />
          </template>
        </a-button>
      </a-space>
    </template>
    <template v-else>
      <a-button
        type="link"
        @click="isListFormShown = true"
      >
        + list
      </a-button>
    </template>
  </div>

  <a-row justify="end">
    <a-col>
      <a-button
        type="primary"
        @click="submit"
      >
        submit
      </a-button>
    </a-col>
  </a-row>
</template>
