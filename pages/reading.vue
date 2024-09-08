<script setup>
import { ref } from 'vue';
import FloatButtonGroup from '@/components/common/FloatButtonGroup.vue';
import AddList from '@/components/reading/AddList.vue';
import AddWork from '@/components/reading/add-work/AddWork.vue';
import ListCard from '@/components/reading/list-card/ListCard.vue';
import UnsplashlikeColumns from '@/components/common/UnsplashlikeColumns.vue';

const lists = ref([])

const loadLists = async () => {
  const res = await $fetch('/api/reading/lists')
  lists.value = res.data
}

loadLists()
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-6">
    <UnsplashlikeColumns
      :items="lists"
    >
      <template #renderItem="{ item }" :key="item.listId">
        <ListCard
          :title="item.title"
          :items="item.items"
          class="mb-6"
        />
      </template>
    </UnsplashlikeColumns>
  </div>

  <FloatButtonGroup>
    <AddWork
      @success="loadLists"
      @list-success="loadLists"
    />
    
    <AddList
      @success="loadLists"
    />
  </FloatButtonGroup>
</template>
