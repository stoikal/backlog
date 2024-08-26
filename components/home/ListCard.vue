<script setup>
const props = defineProps({
  title: String,
  items: Array,
})
</script>

<template>
  <a-card
    :title="props.title"
    :bodyStyle="{ padding: 0 }"
    style="margin-bottom: 2rem; padding: 0"
    hoverable
  >
    <a-list
      :data-source="props.items"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-space>
            <a-checkbox
              :checked="item.isFinished"
            />
            <s v-if="item.isFinished">{{ item.gameTitle }}</s>
            <span v-else>{{ item.gameTitle }}</span>
          </a-space>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<style>
.ant-checkbox-checked .ant-checkbox-inner {
  background-color: lightgray;
  border-color: lightgray
}
</style>