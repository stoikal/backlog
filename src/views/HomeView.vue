<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { getBacklog, signOut } from '../client'

const router = useRouter()

const lists = ref([])

const loadData = async () => {
  const backlog = await getBacklog()

  lists.value = backlog
}

loadData()

const signOutAndRedirect = async () => {
  await signOut()
  router.push('/login')
}

</script>

<template>
  <div>
    <button @click="signOutAndRedirect">sign out</button>
    <div
      v-for="list in lists"
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
