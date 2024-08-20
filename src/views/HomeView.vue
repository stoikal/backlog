<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { getBacklog, getDecade, signOut } from '../client'

const router = useRouter()

const backlog = ref([])
const decades = ref([])

const loadData = async () => {
  [
    backlog.value,
    decades.value,
  ] = await Promise.all([
    getBacklog(),
    getDecade(),
  ])
}

loadData()

const signOutAndRedirect = async () => {
  await signOut()
  router.push('/login')
}

const countFinished = (items) => {
  return items.filter((item) => item.isFinished).length
}

const sortedBacklog = computed(() => {  
  return backlog.value
    .sort((a, b) => countFinished(a.items) - countFinished(b.items))
})


const displayedBacklog = computed(() => {
  return sortedBacklog.value.concat(decades.value)
})
</script>

<template>
  <a-row justify="end">
    <a-col>
      <a-button @click="signOutAndRedirect">sign out</a-button>
    </a-col>
  </a-row>
  <a-card>
    <div
      v-for="list in displayedBacklog"
      :key="list.id"
    >
      <h3>{{ list.title }}</h3>

      <ul>
        <li
          v-for="item in list.items"
          :key="item.gameId"
        >
          <s v-if="item.isFinished">{{ item.gameTitle }}</s>
          <span v-else>{{ item.gameTitle }}</span>
        </li>
      </ul>
    </div>
  </a-card>
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
