<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

const props = defineProps({
  title: String
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        {{  props.title }}
      </CardTitle>
    </CardHeader>
  </Card>
</template>
