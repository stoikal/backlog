<script setup>
import { Trash } from 'lucide-vue-next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import EditListButton from './EditListButton.vue'
import AddListItemForm from './AddListItemForm.vue'
import ListCardItem from './ListCardItem/index.vue'
import GameComment from "./GameComment/index.vue"

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

const handleStatusCheckboxChange = async (item, checked) => {
  await $fetch('/api/list-items/update-status', {
    method: 'PUT',
    body: {
      gameId: item.gameId,
      isFinished: checked,
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

const isDeleteConfirmOpen = ref(false)
</script>

<template>
  <Card class="mb-6">
    <CardHeader class="border-b flex-row justify-between items-center">
      <CardTitle class="mb-0 h3">
        {{ props.title }}
      </CardTitle>
      <!-- <div  class="flex justify-between items-center"> -->
      <div class="space-x-2" v-if="!props.readOnly">
        <EditListButton
          :list-id="props.listId"
          :list-title="props.title"
          :list-items="sortedItems"
          @update-success="emit('updateSuccess')"
        />
        <Popover v-model:open="isDeleteConfirmOpen">
          <PopoverTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="rounded-full"
            >
              <Trash class="text-red-900"/>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <p>
                Delete?
              </p>
              <div class="text-end space-x-4">
                <Button variant="outline" @click="isDeleteConfirmOpen = false">No</Button>
                <Button @click="handleDeleteList">Yes</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <!-- </div> -->
    </CardHeader>

    <CardContent>
      <template v-for="item in sortedItems" :key="item.gameId">
        <div class="py-6 border-b items-center flex gap-x-2 justify-between">
          <div class="items-center flex gap-x-2">
            <Checkbox
              :checked="item.isFinished"
              @update:checked="handleStatusCheckboxChange(item, $event)"
            />

            <ListCardItem
              :isFinished="item.isFinished"
              :gameTitle="item.gameTitle"
              :gameId="item.gameId"
              @success="emit('updateSuccess')"
            />
          </div>
          <div>
            <GameComment
              :gameId="item.gameId"
              :gameTitle="item.gameTitle"
            />
          </div>
        </div>
      </template>
    </CardContent>

    <CardFooter class="justify-center">
      <AddListItemForm
        v-if="!props.readOnly"
        :list-id="props.listId"
        @success="emit('createItemSuccess')"
      />
    </CardFooter>
  </Card>
</template>
