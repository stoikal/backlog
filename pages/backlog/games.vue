<script setup>
import { ref } from 'vue'
import AddList from '~/components/backlog-games/AddList.vue';
import FloatButtonGroup from '~/components/common/FloatButtonGroup.vue';
import UnsplashlikeColumns from '~/components/common/UnsplashlikeColumns.vue';
import ListCard from '~/components/home/ListCard/index.vue';
import FilteredLists from '~/components/home/FilteredLists.vue';
import AddGameButton from '~/components/home/AddGameButton/index.vue';

definePageMeta({ middleware: 'auth' })

const rawLists = ref([])

const loadLists = async () => {
  const res = await $fetch('/api/lists')
  rawLists.value = res.data
}

// loadLists()

// group list-cards into columns
const customReducer = (columns, item, itemIndex, columnCount) => {
  let cols = itemIndex === 0
    ? Array(columnCount).fill(null).map(() => [])
    : columns

  let shortestIndex = 0

  for (let i = 1; i < cols.length; i++) {
    const prev = cols[shortestIndex].reduce((a, b) => a + 2 + b.items.length ?? 0, 0)
    const curr = cols[i].reduce((a, b) => a + 2 + b.items.length ?? 0, 0)

    if (curr < prev) {
      shortestIndex = i
    }
  }

  cols[shortestIndex].push(item)

  return cols
}
</script>

<template>
  <div style="max-width: 1200px; margin: 0 auto;">
    <FilteredLists :lists="rawLists">
      <template v-slot="{ lists }">
        <UnsplashlikeColumns
          :items="lists"
          :customReducer="customReducer"
        >
          <template #renderItem="{ item }">
            <ListCard
              :key="item.listId"
              :listId="item.listId"
              :title="item.title"
              :items="item.items"
              :read-only="item.pseudo"
              @delete-success="loadLists"
              @update-success="loadLists"
              @create-item-success="loadLists"
            />
          </template>
        </UnsplashlikeColumns>
      </template>
    </FilteredLists>
  </div>

  <a-float-button-group
  :open="false"
  shape="circle" :style="{ right: '24px' }"
  >
    <AddGameButton
      @success="loadLists"
      @list-success="loadLists"
    />
  </a-float-button-group>

  <FloatButtonGroup>
    <AddList
      @success="loadLists"
    />
  </FloatButtonGroup>
</template>