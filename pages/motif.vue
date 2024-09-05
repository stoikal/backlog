<script setup>
const motifs = [
  {
    id: 1,
    name: 'Motif 1',
    nodes: [
      { id: 3, date: '2024/08/30', next: null, done: ['iterate c', 'research d'], todo: ['do e', 'work on f'] },
      { id: 2, date: '2024/08/20', next: 3, done: ['work on a', 'do b'], todo: ['iterate c', 'research d'] },
      { id: 1, date: '2024/08/10', next: 2, todo: ['work on a', 'do b'] },
    ]
  },
  {
    id: 2,
    name: 'Motif 2',
    nodes: [
    { id: 2, date: '2024/08/31', next: 3, done: ['a', 'b'], todo: ['c', 'd'] },
    { id: 1, date: '2024/08/29', next: 2, todo: ['a', 'b'] },
    ]
  },
  {
    id: 3,
    name: 'Motif 3',
    nodes: [
    { id: 3, date: '2024/08/30', next: null, done: ['c', 'd'], todo: ['e', 'f'] },
      { id: 2, date: '2024/08/20', next: 3, done: ['a', 'b'], todo: ['c', 'd'] },
      { id: 1, date: '2024/08/10', next: 2, todo: ['a', 'b'] },
    ]
  },
  {
    id: 4,
    name: 'Motif 4',
    nodes: [
    { id: 3, date: '2024/08/30', next: null, done: ['c', 'd'], todo: ['e', 'f'] },
      { id: 2, date: '2024/08/20', next: 3, done: ['a', 'b'], todo: ['c', 'd'] },
      { id: 1, date: '2024/08/10', next: 2, todo: ['a', 'b'] },
    ]
  },
]

const shownStartIndex = ref(0)
</script>

<template>
  <button
    :disabled="shownStartIndex === 0"
    @click="shownStartIndex--"
  >
    <
  </button>
  <div
    style="width: 1000px; margin: 0 auto;"
  >
    <a-row justify="center" :gutter="16">
      <template v-for="motif in motifs.slice(shownStartIndex, shownStartIndex + 3)">
        <a-col :span="8">
          {{  motif.name }}
          <template v-for="node in motif.nodes" :key="node.id">
            <a-card>
              <template #extra>
                {{ node.date }}
              </template>
              <template v-if="node.done?.length > 0">
                PREV
                <ul>
                  <template v-for="item in node.done">
                    <li>{{ item }}</li>
                  </template>
                </ul>
              </template>
      
              <template v-if="node.todo?.length > 0">
                TODO
                <ul>
                  <template v-for="item in node.todo">
                    <li>{{ item }}</li>
                  </template>
                </ul>
              </template>
            </a-card>
          </template>
        </a-col>
      </template>
    </a-row>
  </div>
  <button
    :disabled="shownStartIndex >= motifs.length - 3"
    @click="shownStartIndex++"
  >
    >
  </button>
</template>