<script setup>
import { ref } from 'vue'
import AddListForm from './AddListForm.vue';

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

const selectedLists = ref([])
const selectedGame = ref(null)
</script>

<template>


  <a-checkbox-group
    v-model:value="selectedLists"
    :options="checkboxOptions"
  />

  <AddListForm
    @success="loadLists"
  />

  <a-row justify="end">
    <a-col>
      <a-button>submit</a-button>
    </a-col>
  </a-row>

</template>