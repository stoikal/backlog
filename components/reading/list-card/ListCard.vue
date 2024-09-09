<script setup>
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

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
            <s v-if="item.isFinished">{{ item.workTitle }}</s>
            <span v-else>{{ item.workTitle }}</span>
          </div>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
