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
      if (res.data) {
        const listIds = res.data.map((list) => list.listId)
        selectedLists.value = listIds
        listsContainingSelectedGame.value = listIds
      }
    })
})

const handleListSuccess = () => {
  loadLists()
  emit('listSuccess')
}

const submit = async () => {
  const gameId = selectedGame.value?.value
  
  if (gameId) {
    const game = selectedGame.value.option.game

    await $fetch('/api/games', {
      method: 'POST',
      body: game
    })

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

const getGenres = (game = {}) => {
  return game.genres
    ?.map((item) => item.name)
    .join(', ')
}

const getPlatforms = (game = {}) => {
  return game.platforms
    ?.map((item) => item.name)
    .join(', ')
}

const getReleaseDate = (game = {}) => {
  if (!game.firstReleaseDate) return ''

  return new Date(game.firstReleaseDate * 1000)
    .toISOString().slice(0, 10);
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
        {{ getGenres(selectedGame?.option.data) }}
      </div>
      <div>
        {{ getPlatforms(selectedGame?.option.data) }}
      </div>
      <div>
        {{ getReleaseDate(selectedGame?.option.data) }}
      </div>
    </div>
  </div>

  <div>
    <a-checkbox-group
      v-model:value="selectedLists"
      :options="checkboxOptions"
    />
  </div>

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