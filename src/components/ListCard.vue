<script setup>
import { ref } from 'vue';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import GameSelect from './GameSelect.vue';
import { addItemToList, updateGameStatus, deleteList, updateList, deleteListItemsOfList } from '../client/lists';

const props = defineProps({
  listId: String,
  title: String,
  items: Array,
  readOnly: Boolean
})

const emit = defineEmits(['createSuccess', 'updateSuccess', 'deleteSuccess'])

const isInputVisible = ref(false)

const showInput = () => {
  isInputVisible.value = true
}

const selectedGame = ref(null)
const isGameFinished = ref(false)

const handleSubmit = async () => {
  const gameId = selectedGame.value.value
  const isFinished = isGameFinished.value

  await addItemToList(props.listId, { gameId, isFinished })
  selectedGame.value = null
  isGameFinished.value = false
  isInputVisible.value = false
  emit('createSuccess')
}

const handleStatusCheckboxChange = async (item, event) => {
  await updateGameStatus({
    gameId: item.gameId,
    isFinished: event.target.checked,
  })

  emit('updateSuccess')
}

const handleDeleteList = async () => {
  await deleteList(props.listId)

  emit('deleteSuccess')
}

const titleEdit = ref('')
const listItemsEdit = ref([])
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  titleEdit.value = props.title
  listItemsEdit.value = props.items
}

const tempDeleteItem = (item) => {
  listItemsEdit.value = listItemsEdit.value.filter(i => i !== item)
}

const submitEdit = async () => {
  await updateList(props.listId, {
    title: titleEdit.value
  })

  const toDelete = props.items
    .filter((item) => listItemsEdit.value.every((i) => i.gameId !== item.gameId))
    .map((item) => item.gameId)

  await deleteListItemsOfList(props.listId, toDelete)

  isModalOpen.value = false
  emit('updateSuccess')
}

</script>

<template>
  <a-card
    :title="props.title"
    style="margin-bottom: 2rem; padding: 0"
    :bodyStyle="{ padding: 0 }"
    hoverable
  >
    <template #extra v-if="!props.readOnly">
      <a-space>
        <a-button
          type="text"
          shape="circle"
          :size="size"
          @click="openModal"
        >
          <template #icon>
            <edit-outlined style="color: gray"/>
          </template>
        </a-button>
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
              @change="handleStatusCheckboxChange(item, $event)"
            />
            <s v-if="item.isFinished">{{ item.gameTitle }}</s>
            <span v-else>{{ item.gameTitle }}</span>
          </a-space>
        </a-list-item>
      </template>
      <template #footer>
        <!-- <a-list-item> -->
          <div style="padding: 0 1rem" v-if="!props.readOnly">
            <template v-if="isInputVisible">
              <a-space style="margin-bottom: .5rem;">
                <game-select
                  v-model:value="selectedGame"
                />
                <a-checkbox
                  v-model:checked="isGameFinished"
                >
                  finished
                </a-checkbox>
              </a-space>
              <a-row :gutter="8" justify="end">
                <a-col>
                  <a-button @click="isInputVisible = false">cancel</a-button>
                </a-col>
                <a-col>
                  <a-button type="primary" @click="handleSubmit">submit</a-button>
                </a-col>
              </a-row>
            </template>
            
            <template v-else>
              <div style="text-align: center;">
                <a-button
                  type="text"
                  shape="circle"
                  size="large"
                  @click="showInput"
                  >
                  <plus-outlined style="color: gray"/>
                </a-button>
              </div style="text-align: center;">
            </template>
          </div>

        <!-- </a-list-item> -->
      </template>
    </a-list>
  </a-card>

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
        <a-input
          v-model:value="titleEdit"
        />
      </a-form-item>

      <a-list
        :data-source="listItemsEdit"
      >
        <template #renderItem="{ item }">
          <a-list-item style="padding: 12px 10px;">
            {{ item.gameTitle }}
            <template #actions>
              <a-space>
                <!-- <a-button type="text" shape="circle">
                  <edit-outlined style="color: gray" />
                </a-button> -->
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

<style>
 .ant-checkbox-checked .ant-checkbox-inner {
  background-color: lightgray;
  border-color: lightgray
}
</style>