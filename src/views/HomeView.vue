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

const countFinished = (items) => {
  return items.filter((item) => item.isFinished).length
}

const sortByFinishedCount = (a, b) => {
  const finishedA = countFinished(a.items)
  const finishedB = countFinished(b.items)

  if (finishedA < finishedB) return -1
  if (finishedA > finishedB) return 1

  const unfinishedA = a.items.length - finishedA
  const unfinishedB = b.items.length - finishedB

  if (unfinishedA > unfinishedB) return -1
  if (unfinishedA < unfinishedB) return 1

  return 0
}

const sortAlphabetically = (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

const sortByCreatedDate = (a, b) => {
  const timeA = new Date(a.createdAt).getTime()
  const timeB = new Date(b.createdAt).getTime()

  if (timeA > timeB) return -1
  if (timeA < timeB) return 1
  return 0
}

const comparators = {
  alphabet: sortAlphabetically,
  finished: sortByFinishedCount,
  created: sortByCreatedDate,
}

const sortBy = ref('finished')

const sortedBacklog = computed(() => {
  return backlog.value
    .sort(comparators[sortBy.value])
})

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

  const all = sortedBacklog.value.concat(decades.value)
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
    <a-row
      justify="end"
      style="margin-bottom: 2rem;"
    >
      <a-col>
        <a-space>
          <label>sort by:</label>
          <a-select
            v-model:value="sortBy"
            placeholder="sort"
            style="min-width: 160px"
            :options="[
              { value: 'created', label: 'created date' },
              { value: 'alphabet', label: 'alphabetical order' },
              { value: 'finished', label: 'finished count' },
            ]"
          />
        </a-space>
      </a-col>
    </a-row>


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
              :hide-add-button="list.pseudo"
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
