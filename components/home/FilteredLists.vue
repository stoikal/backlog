<script setup>
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  lists: Array,
})

const gameTitleFilter = ref('')

const debouncedChangeGameTitleFilter = useDebounceFn((e) => {
  gameTitleFilter.value = e.target.value
}, 600)

const filteredLists = computed(() => {
  const searchKey = gameTitleFilter.value.toLowerCase()
  const isFilterEmpty = gameTitleFilter.value.length === 0

  return props.lists
    .map((list) => ({
      ...list,
      items: list.items
        .filter((item) => {
          const gameTitle = item.gameTitle.toLowerCase()

          return isFilterEmpty || gameTitle.includes(searchKey)
        })
    }))
    .filter((list) => isFilterEmpty || list.items.length >  0)
})

const countFinished = (items) => {
  return items.filter((item) => item.isFinished).length
}

const sortByFinishedCount = (a, b) => {
  const finishedA = countFinished(a.items)
  const finishedB = countFinished(b.items)

  if (finishedA < finishedB) return -1
  if (finishedA > finishedB) return 1

  const unfinishedA = a.items.length - finishedA
  const unfinishedB = b.items.length - finishedB

  if (unfinishedA > unfinishedB) return -1
  if (unfinishedA < unfinishedB) return 1

  return 0
}

const sortAlphabetically = (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

const sortByCreatedDate = (a, b) => {
  const timeA = new Date(a.createdAt).getTime()
  const timeB = new Date(b.createdAt).getTime()

  if (timeA > timeB) return -1
  if (timeA < timeB) return 1
  return 0
}

const comparators = {
  alphabet: sortAlphabetically,
  finished: sortByFinishedCount,
  created: sortByCreatedDate,
}

const sortBy = ref('finished')

const sortedLists = computed(() => {
  return [...filteredLists.value]
    .sort(comparators[sortBy.value])
})
</script>

<template>
  <a-row
    justify="space-between"
    style="margin-bottom: 2rem;"
  >
    <a-col>
      <a-input
        :value="gameTitleFilter"
        placeholder="Game title"
        @change="debouncedChangeGameTitleFilter"
      />
    </a-col>
    <a-col>
      <a-space>
        <label>sort by:</label>
        <a-select
          v-model:value="sortBy"
          placeholder="sort"
          style="min-width: 160px"
          :options="[
            { value: 'created', label: 'created date' },
            { value: 'alphabet', label: 'alphabetical order' },
            { value: 'finished', label: 'finished count' },
          ]"
        />
      </a-space>
    </a-col>
  </a-row>

  <slot :lists="sortedLists"></slot>
</template>