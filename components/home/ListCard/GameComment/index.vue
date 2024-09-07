<script setup>
import GameCommentForm from './GameCommentForm.vue';

const props = defineProps({
  gameId: String,
  gameTitle: String,
})

const isModalOpen = ref(false);
</script>

<template>
  <a-button
    type="text"
    shape="circle"
    @click="isModalOpen = true"
  >
    <template #icon>
      <message-outlined style="color: gray"/>
    </template>
  </a-button>

  <a-modal
    :open="isModalOpen"
    :title="props.gameTitle"
    destroy-on-close
    :footer="false"
    @cancel="isModalOpen = false"
  >
    <GameCommentForm
      :gameId="props.gameId"
      @success="isModalOpen = false"
    />
  </a-modal>
</template>
