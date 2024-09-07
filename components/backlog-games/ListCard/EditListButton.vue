<script setup>
import { ref } from 'vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['updateSuccess'])

const props = defineProps({
  listId: String,
  listTitle: String,
  listItems: Array,
})

const isModalOpen = ref(false)

const titleEdit = ref('')
const listItemsEdit = ref([])

const openModal = () => {
  isModalOpen.value = true
  titleEdit.value = props.listTitle
  listItemsEdit.value = props.listItems
}

const tempDeleteItem = (item) => {
  listItemsEdit.value = listItemsEdit.value.filter(i => i !== item)
}

// TODO add confirmation
const submitEdit = async () => {
  const gameIdsToDelete = props.listItems
    .filter((item) => listItemsEdit.value.every((i) => i.gameId !== item.gameId))
    .map((item) => item.gameId)

  await $fetch(`/api/list-items/by-list/${props.listId}`, {
    method: 'DELETE',
    body: {
      gameIds: gameIdsToDelete
    }
  })

  await $fetch(`/api/lists/${props.listId}`, {
    method: 'PUT',
    body: {
      title: titleEdit.value
    }
  })

  isModalOpen.value = false
  emit('updateSuccess')
}
</script>

<template>
  <a-button
    type="text"
    shape="circle"
    @click="openModal"
  >
    <template #icon>
      <edit-outlined style="color: gray"/>
    </template>
  </a-button>

  <a-modal
    title="Edit"
    :open="isModalOpen"
    @cancel="isModalOpen = false"
    @ok="submitEdit" 
  >
    <a-form
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
      style="padding: 1rem 0"  
    >
      <a-form-item label="Title">
        <a-input v-model:value="titleEdit"/>
      </a-form-item>
      <a-list
        :data-source="listItemsEdit"
      >
        <template #renderItem="{ item }">
          <a-list-item
            style="padding: 12px 10px;"
          >
            {{ item.gameTitle }}

            <template #actions>
              <a-space>
                <a-popconfirm
                  title="Delete?"
                  ok-text="Yes"
                  cancel-text="No"
                  size="large"
                  @confirm="tempDeleteItem(item)"
                >
                  <a-button type="text" shape="circle">
                    <template #icon>
                      <delete-outlined style="color: salmon" />
                    </template>
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </a-form>
  </a-modal>
</template>