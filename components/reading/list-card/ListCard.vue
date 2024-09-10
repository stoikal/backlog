<script setup>
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ListCardItemForm from './ListCardItemForm.vue';

const emit = defineEmits(['updateSuccess'])

const props = defineProps({
  title: String,
  items: Array,
})

const handleStatusCheckboxChange = async (item, checked) => {
  const workKey = encodeURIComponent(item.workKey)

  await $fetch(`/api/reading/works/${workKey}/status`, {
    method: 'PUT',
    body: {
      workKey,
      isFinished: checked,
    }
  })

  emit('updateSuccess')
}

const listItemDialog = ref({
  open: false,
  workKey: null
})

const sortedItems = computed(() => {
  return props.items
    .sort((a, b) => {
      // finished items last
      if (!a.isFinished && b.isFinished) return -1
      if (a.isFinished && !b.isFinished) return 1

      // if finished statuses are the same then sort alphabetically
      if (a.workTitle < b.workTitle) return -1
      if (a.workTitle > b.workTitle) return 1

      return 0
    })
})
</script>

<template>
  <Card>
    <CardHeader class="border-b">
      <CardTitle class="text-md">
        {{ props.title }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <template v-for="item in sortedItems" :key="item.workKey">
        <div class="py-3 items-center flex gap-x-2 justify-between">
          <div class="items-top flex gap-x-2">
            <Checkbox
              :checked="item.isFinished"
              class="h-3 w-3 mt-1.5"
              @update:checked="handleStatusCheckboxChange(item, $event)"
            />
            <p
              role="button"
              class="text-sm"
              @click="listItemDialog = {
                workKey: item.workKey,
                open: true,
              }"
            >
              <s v-if="item.isFinished">{{ item.workTitle }}</s>
              <span v-else>{{ item.workTitle }}</span>
            </p>
          </div>
        </div>
      </template>
    </CardContent>

    <Dialog
      v-model:open="listItemDialog.open"
    >
      <DialogContent>
        <DialogHeader class="mb-4">
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <ListCardItemForm
          :workKey="listItemDialog.workKey"
          @success="() => {
            listItemDialog = {
              open: false,
              workKey: null,
            }
            emit('updateSuccess')
          }"
        />
      </DialogContent>
    </Dialog>
  </Card>
</template>
