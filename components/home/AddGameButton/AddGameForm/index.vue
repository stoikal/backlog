<script setup>
import { ref, watch } from 'vue'
import GameSelect from '~/components/common/GameSelect.vue';
import AddListForm from './AddListForm.vue';

const emit = defineEmits(['success', 'listSuccess'])

const lists = ref([])

const loadLists = async () => {
  const res = await $fetch('/api/lists')
  lists.value = res.data
}

loadLists()

const checkboxOptions = computed(() => {
  return lists.value.map((list) => ({
    label: list.title,
    value: list.listId
  }))
})

const selectedGame = ref(null)
const listsContainingSelectedGame = ref([])
const selectedLists = ref([])

watch(() => selectedGame.value?.value, (gameId) => {
  $fetch(`/api/lists/by-game/${gameId}`)
    .then((res) => {
      const listIds = res.data.map((list) => list.listId)
      selectedLists.value = listIds
      listsContainingSelectedGame.value = listIds
    })
})

const handleListSuccess = () => {
  loadLists()
  emit('listSuccess')
}

const submit = async () => {
  const gameId = selectedGame.value?.value

  if (gameId) {
    const listItemsToCreate = selectedLists.value
      .filter((list) => !listsContainingSelectedGame.value.includes(list))
      .map((listId) => ({
        listId,
        gameId,
      }))

    const listIdsToDelete = listsContainingSelectedGame.value
      .filter((list) => !selectedLists.value.includes(list))
    
    if (listItemsToCreate.length) {
      await $fetch('/api/list-items', {
        method: 'POST',
        body: {
          listItems: listItemsToCreate
        }
      })
    }

    if (listIdsToDelete.length) {
      await $fetch(`/api/list-items/by-game/${gameId}`, {
        method: 'DELETE',
        body: {
          listIds: listIdsToDelete
        }
      })
    }
  
    emit('success')
  }
}
</script>

<template>
  <div style="margin-bottom: 1rem;">
    <GameSelect
      v-model:value="selectedGame"
      size="large"
      style="width: 100%"
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
  </div>

  <a-checkbox-group
    v-model:value="selectedLists"
    :options="checkboxOptions"
  />

  <AddListForm
    @success="handleListSuccess"
  />

  <a-row justify="end">
    <a-col>
      <a-button
        @click="submit"
      >
        submit
      </a-button>
    </a-col>
  </a-row>

</template>