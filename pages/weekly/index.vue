<script setup>
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Week from './Week.vue';

dayjs.extend(weekOfYear);

const currentWeek = dayjs().week();

const activeTab = ref(currentWeek);

const weeks = new Array(52)
  .fill(null)
  .map((_, index) => index + 1);

</script>

<template>
  <div style="max-width: 1200px; margin: 0 auto;">
    <a-tabs
      v-model:activeKey="activeTab"
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
    </a-tabs>
  </div>
</template>