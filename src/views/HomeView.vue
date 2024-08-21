<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { getBacklog, getDecade } from '../client'
import { signOut } from '../client/auth';
import { createList } from "../client/lists"

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

const isModalOpen = ref(false)
const listTitle = ref('')
const handleOk = async () => {
  await createList({ title: listTitle.value })
  isModalOpen.value = false
  loadData()
}

const handleCancel = async () => {

}

const openModal = () => {
  isModalOpen.value = true
}
</script>

<template>
  <a-row justify="end">
    <a-col>
      <a-button @click="signOutAndRedirect">sign out</a-button>
    </a-col>
  </a-row>
  <a-card>
    <a-button @click="openModal">create</a-button>
    <template
      v-for="list in displayedBacklog"
      :key="list.id"
    >
      <a-card
        :title="list.title "
        style="width: 400px; margin-bottom: 2rem; padding: 0"
        hoverable
      >
        <a-list
          :data-source="list.items"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <s v-if="item.isFinished">{{ item.gameTitle }}</s>
              <span v-else>{{ item.gameTitle }}</span>
            </a-list-item>
          </template>
          <template #footer>
            <a-list-item>
              <a-button>
                +
              </a-button>

            </a-list-item>
          </template>
        </a-list>

      </a-card>
    </template>
  </a-card>
  <a-modal v-model:open="isModalOpen" title="Create List" @ok="handleOk">
    <template #footer>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
    </template>
    <a-input v-model:value="listTitle" />
  </a-modal>
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
