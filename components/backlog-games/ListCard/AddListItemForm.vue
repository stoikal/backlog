<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import GameSelect from '../../common/GameSelect.vue';

const props = defineProps({
  listId: String,
})

const emit = defineEmits(['success'])

const isInputVisible = ref(false)

const selectedGame = ref(null)

const save = async () => {
  const gameId = selectedGame.value.value

  if (gameId) {
    const game = selectedGame.value.option.data

    await $fetch('/api/games', {
      method: 'POST',
      body: game
    })

    await $fetch('/api/list-items', {
      method: 'POST',
      body: {
        listItems: [{
          listId: props.listId,
          gameId,
        }]
      }
    })

    emit('success')
    selectedGame.value = null
    isInputVisible.value = false
  }
}
</script>

<template>
  <template v-if="isInputVisible">
    <div class="w-full">
      <GameSelect
        size="large"
        v-model:value="selectedGame"
        style="width: 100%; margin-bottom: 1rem;"
      />
      <div class="space-x-4 text-end">
        <Button variant="outline" @click="isInputVisible = false">cancel</Button>
        <Button @click="save">save</Button>
      </div>
    </div>
  </template>
  
  <template v-else>
    <div style="text-align: center;">
      <Button
        variant="ghost"
        size="icon"
        class="rounded-full"
        @click="isInputVisible = true"
      >
        <Plus />
      </Button>
    </div>
  </template>
</template>