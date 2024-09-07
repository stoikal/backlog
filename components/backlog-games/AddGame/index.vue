<script setup>
import { Plus } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddGameForm from './AddGameForm/index.vue'

const emit = defineEmits(['success', 'listSuccess'])

const isDialogOpen = ref(false)


</script>

<template>
  <Dialog
    v-model:open="isDialogOpen"
    class="w-[320rem]"
  >
    <DialogTrigger>
      <button
        type="button"
        class="p-3 rounded-full bg-white hover:bg-zinc-50 drop-shadow-md"
      >
        <Plus />
      </button>
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