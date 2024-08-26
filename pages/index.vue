<script setup>
import { ref } from 'vue'
import UnsplashlikeColumns from '~/components/common/UnsplashlikeColumns.vue';
import ListCard from '~/components/home/ListCard.vue';
import FilteredLists from '~/components/home/FilteredLists.vue';

definePageMeta({ middleware: 'auth' })

const rawLists = ref([])

const fetchLists = async () => {
  const res = await $fetch('/api/lists')
  rawLists.value = res.data
}

fetchLists()
</script>

<template>
  <FilteredLists :lists="rawLists">
    <template v-slot="{ lists }">
      <UnsplashlikeColumns
        :items="lists"
      >
        <template #renderItem="{ item }" :key="item.listId">
          <ListCard
            :title="item.title"
            :items="item.items"
          />
        </template>
      </UnsplashlikeColumns>
    </template>
  </FilteredLists>
</template>