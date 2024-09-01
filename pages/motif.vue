<script setup>
const motifs = [
  {
    id: 1,
    name: 'Thread 1',
    nodes: [
      { id: 3, date: '2024/08/30', next: null, done: ['c', 'd'], todo: ['e', 'f'] },
      { id: 2, date: '2024/08/20', next: 3, done: ['a', 'b'], todo: ['c', 'd'] },
      { id: 1, date: '2024/08/10', next: 2, todo: ['a', 'b'] },
    ]
  },
  {
    id: 2,
    name: 'Thread 2',
    nodes: [
    { id: 2, date: '2024/08/31', next: 3, done: ['a', 'b'], todo: ['c', 'd'] },
    { id: 1, date: '2024/08/29', next: 2, todo: ['a', 'b'] },
    ]
  },
]
</script>

<template>
  <div
    style="width: 1000px; margin: 0 auto;"
  >
    <a-row justify="center" :gutter="16">
      <template v-for="motif in motifs">
        <a-col :span="8">
          {{  motif.name }}
          <template v-for="node in motif.nodes" :key="node.id">
            <a-card
              :title="node.id"
            >
              <template v-if="node.done?.length > 0">
                DONE
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
</template>