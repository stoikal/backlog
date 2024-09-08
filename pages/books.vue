<script setup>
import { Input } from '~/components/ui/input';
import openLibrary from '~/client/openLibrary';

const searchKey = ref('')
const searchResults = ref([])
const isLoading = ref(false)

const searchBook = async () => {
  isLoading.value = true
  const res = await openLibrary.search(searchKey.value)
  searchResults.value = res.docs
  isLoading.value = false
}
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-6">
    <form @submit.prevent="searchBook" class="flex gap-6 mb-6">
      <Input v-model="searchKey" />
      <Button type="submit">
        Search
      </Button>
    </form>

    <div>
      <template v-if="isLoading">
        loading...
      </template>
      <template v-else-if="searchResults.length === 0">
        no result.
      </template>
      <template v-else>
        <template v-for="item in searchResults" :key="item.key">
          <div>{{ item.title }}</div>
        </template>
      </template>
    </div>
  </div>
</template>