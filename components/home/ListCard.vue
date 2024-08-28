<script setup>
import EditListButton from './EditListButton.vue';
import AddListItemForm from './AddListItemForm.vue';

const props = defineProps({
  listId: String,
  title: String,
  items: Array,
  readOnly: Boolean,
})

const emit = defineEmits(['deleteSuccess', 'updateSuccess', 'createItemSuccess'])

const handleDeleteList = async () => {
  await $fetch(`/api/lists/${props.listId}`, { method: 'DELETE' })

  emit('deleteSuccess')
}

const handleStatusCheckboxChange = async (item, event) => {
  await $fetch('/api/list-items/update-status', {
    method: 'PUT',
    body: {
      gameId: item.gameId,
      isFinished: event.target.checked,
    }
  })

  emit('updateSuccess')
}

const sortedItems = computed(() => {
  const sorted = props.items
    .sort((a, b) => {
      // finished items last
      if (!a.isFinished && b.isFinished) return -1
      if (a.isFinished && !b.isFinished) return 1

      // if finished statuses are the same then sort alphabetically
      if (a.gameTitle < b.gameTitle) return -1
      if (a.gameTitle > b.gameTitle) return 1

      return 0
    })

  return sorted
})
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
        <EditListButton
          :key="props.listId"
          :list-id="props.listId"
          :list-title="props.title"
          :list-items="sortedItems"
          @update-success="emit('updateSuccess')"
        />
  
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
      :data-source="sortedItems"
    >
      <template #renderItem="{ item }">
        <a-list-item :key="item.gameId">
          <a-space>
            <a-checkbox
              :checked="item.isFinished"
              @change="handleStatusCheckboxChange(item, $event)"
            />
            <s v-if="item.isFinished">{{ item.gameTitle }}</s>
            <span v-else>{{ item.gameTitle }}</span>
          </a-space>
        </a-list-item>
      </template>

      <template #footer>
        <div
          v-if="!props.readOnly"
          style="padding: 0 1rem"
        >
          <AddListItemForm
            :list-id="props.listId"
            @success="emit('createItemSuccess')"
          />
        </div>
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
