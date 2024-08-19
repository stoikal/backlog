<script setup lang="ts">
import { ref } from 'vue'
import { getLists, getListItems } from '../client'

const lists = ref([])

const loadData = async (params) => {
  const [
    { data: rawLists },
    { data: rawListItems },
  ] = await Promise.all([
    getLists(),
    getListItems(),
  ])

  const groupedLists = rawLists.map((list) => {
    return {
      id: list.id,
      title: list.title,
      items: rawListItems
        ?.filter((item) => item.list_id === list.id)
        .map((item) => ({
          name: item.games.name,
          thumbnail: item.games.thumbnail,
          isDone: item.games.game_status?.is_done
        }))
    }
  })

  console.log(groupedLists)

  lists.value = groupedLists
}

loadData()

</script>

<template>
  <div>
    <div
      v-for="list in lists"
      :key="list.id"
    >
      <h3>{{ list.title }}</h3>
      <ul>
        <li
          v-for="item in list.items"
          :key="item.id"
        >
          <s v-if="item.isDone">{{ item.name }}</s>
          <span v-else>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
