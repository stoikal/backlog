<script setup>
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

const props = defineProps({
  title: String,
  items: Array,
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
            {{ item.workTitle }}
          </div>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
