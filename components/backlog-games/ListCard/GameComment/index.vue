<script setup>
import { MessageCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import GameCommentForm from './GameCommentForm.vue';

const props = defineProps({
  gameId: String,
  gameTitle: String,
})

const isDialogOpen = ref(false);
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="rounded-full"
      >
        <MessageCircle class="text-zinc-500"/>
      </Button>

    </DialogTrigger>
    <DialogContent>
      <DialogHeader class="mb-4">
        <DialogTitle>{{ props.gameTitle }}</DialogTitle>
      </DialogHeader>

      <GameCommentForm
        :gameId="props.gameId"
        @success="isDialogOpen = false"
      />
    </DialogContent>
  </Dialog>
</template>
