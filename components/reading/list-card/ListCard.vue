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
</script>

<template>
  <Card>
    <CardHeader class="border-b">
      <CardTitle>
        {{  props.title }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <template v-for="item in props.items" :key="item.workKey">
        <div class="py-6 items-center flex gap-x-2 justify-between">
          <div class="items-center flex gap-x-2">
            <Checkbox
              :checked="item.isFinished"
              @update:checked="handleStatusCheckboxChange(item, $event)"
            />
            <p
              role="button"
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
