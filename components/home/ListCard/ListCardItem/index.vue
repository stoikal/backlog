<script setup>
import { ref } from "vue";
import ListCardItemForm from "./ListCardItemForm.vue";

const props = defineProps({
  gameId: Number,
  gameTitle: String,
  isFinished: Boolean,
})

const emit = defineEmits(['success'])

const isModalOpen = ref(false)

const handleClick = () => {
  isModalOpen.value = true;
}

const handleSuccess = () => {
  isModalOpen.value = false;
  emit('success');
}
</script>

<template>
  <span role="button" @click="handleClick">
    <s v-if="props.isFinished">{{ props.gameTitle }}</s>
    <span v-else>{{ props.gameTitle }}</span>
  </span>

  <a-modal
    title="Edit Game"
    :open="isModalOpen"
    destroy-on-close
    :footer="false"
    @cancel="isModalOpen = false"
  >
    <ListCardItemForm
      :gameId="props.gameId"
      @success="handleSuccess"
    />
  </a-modal>
</template>