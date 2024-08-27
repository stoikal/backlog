<script setup>
const props = defineProps({
  listId: String,
  title: String,
  items: Array,
  readOnly: Boolean,
})

const emit = defineEmits(['deleteSuccess'])

const handleDeleteList = async () => {
  await $fetch(`/api/lists/${props.listId}`, { method: 'DELETE' })

  emit('deleteSuccess')
}
</script>

<template>
  <a-card
    :title="props.title"
    :bodyStyle="{ padding: 0 }"
    style="margin-bottom: 2rem; padding: 0"
    hoverable
  >
    <template #extra v-if="!props.readOnly">
      <a-space>
        <a-popconfirm
          title="Delete?"
          ok-text="Yes"
          cancel-text="No"
          size="large"
          @confirm="handleDeleteList"
        >
          <a-button type="text" shape="circle">
            <template #icon>
              <delete-outlined style="color: salmon" />
            </template>
          </a-button>
        </a-popconfirm>
      </a-space>
    </template>
  
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