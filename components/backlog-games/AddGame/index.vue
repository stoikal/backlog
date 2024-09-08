<script setup>
import { Plus } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import AddGameForm from './AddGameForm/index.vue'

const emit = defineEmits(['success', 'listSuccess'])

const isDialogOpen = ref(false)


</script>

<template>
  <Dialog
    v-model:open="isDialogOpen"
    class="w-[320rem]"
  >
    <DialogTrigger as-child>
      <Button
        size="icon"
        class="rounded-full drop-shadow-md"
      >
        <Plus />
      </Button>
    </DialogTrigger>
    <DialogContent class="w-[60rem] max-w-none">
      <DialogHeader>
        <DialogTitle>Add Game</DialogTitle>
      </DialogHeader>

      <AddGameForm
        @close="isModalOpen = false"
        @success="emit('success')"
        @list-success="emit('listSuccess')"
      />
    </DialogContent>
  </Dialog>
</template>