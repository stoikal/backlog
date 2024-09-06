<script setup>
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Week from './Week.vue';

dayjs.extend(weekOfYear);

const currentWeek = dayjs().week();

const activeTab = ref(currentWeek);

const weeks = new Array(currentWeek)
  .fill(null)
  .map((_, index) => index + 1);

</script>

<template>
  <div style="max-width: 1000px; margin: 0 auto;">
    <a-tabs
      v-model:activeKey="activeTab"
      :animated="false"
    >
      <template
        v-for="weekNum in weeks"
        :key="weekNum"
      >
        <a-tab-pane :tab="weekNum">
          <week
            :weekNum="weekNum"
          />
        </a-tab-pane>
      </template>
      <template #leftExtra>
        <a-button
          type="link"
          :disabled="activeTab === 1"
          @click="activeTab--"
        >
          ◀
        </a-button>
      </template>
      <template #rightExtra>
        <a-button
          type="link"
          :disabled="activeTab === 52"
          @click="activeTab++"
        >
          ▶
        </a-button>
      </template> 
    </a-tabs>
  </div>
</template>