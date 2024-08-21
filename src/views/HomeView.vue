<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { getBacklog, getDecade } from '../client'
import { signOut } from '../client/auth';
import { createList } from "../client/lists"
import ListCard from '../components/ListCard.vue';
import { PlusOutlined } from '@ant-design/icons-vue';

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

// const countFinished = (items) => {
//   return items.filter((item) => item.isFinished).length
// }

// const sortedBacklog = computed(() => {  
//   return backlog.value
//     .sort((a, b) => countFinished(a.items) - countFinished(b.items))
// })

const breakpoints = useBreakpoints(breakpointsTailwind)
const columnCount = computed(() => {
  let count = 1

  if (breakpoints.greaterOrEqual('lg').value) {
    count = 3
  } else if (breakpoints.greaterOrEqual('sm').value) {
    count = 2
  }

  return count
})

const displayedBacklog = computed(() => {
  let divider = columnCount.value;

  const all = backlog.value.concat(decades.value)
  let columns = []

  all.forEach((item, itemIndex) => {
    const columnIndex = itemIndex % divider

    if (columns[columnIndex]) {
      columns[columnIndex].push(item)
    } else {
      columns[columnIndex] = [item]
    }
  })

  return columns
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
  <div style="max-width: 1200px; margin: 0 auto;">

    <a-row :gutter="24">
      <template
        v-for="backlog, index in displayedBacklog"
        :key="index"
      >
        <a-col :span="24 / columnCount">
          <template
            v-for="list in backlog"
            :key="list.id"
          >
            <list-card
              :list-id="list.id"
              :title="list.title"
              :items="list.items"
              @create-success="loadData"
              @update-success="loadData"
              @delete-success="loadData"
            />
          </template>
        </a-col>
      </template>
    </a-row>
  </div>

  <a-float-button @click="openModal">
    <template #icon>
      <PlusOutlined />
    </template>
  </a-float-button>

  <a-modal v-model:open="isModalOpen" title="Create List" @ok="handleOk">
    <template #footer>
      <a-button key="submit" type="primary" @click="handleOk">Submit</a-button>
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
