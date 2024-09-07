<script setup>
import { FileText } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const emit = defineEmits(['success'])

const isDialogOpen = ref(false)

const listTitle = ref("")

const save = async () => {
  await $fetch('/api/lists', {
    method: 'POST',
    body: {
      title: listTitle.value
    }
  })

  isDialogOpen.value = false
  listTitle.value = "";
  emit('success')
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger>
      <button
        type="button"
        class="p-3 rounded-full bg-white hover:bg-zinc-50 drop-shadow-md"
      >
        <FileText />
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add List</DialogTitle>
      </DialogHeader>

      <div class="mb-4">
        <Label class="block mb-2">Title</Label>
        <Input v-model="listTitle" />
      </div>

      <DialogFooter>
        <Button
          :disabled="!listTitle.length"
          @click="save"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>