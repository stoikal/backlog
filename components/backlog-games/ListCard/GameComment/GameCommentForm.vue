<script setup>
const props = defineProps({
  gameId: String,
})

const emit = defineEmits('success')

const comment = ref('')

const load = async () => {
  const res = await $fetch(`/api/games/comment/${props.gameId}`);
  comment.value = res.data.comment;
}

load();

const save = async () => {
  const res = await $fetch(`/api/games/comment/${props.gameId}`, {
    method: 'POST',
    body: {
      comment: comment.value,
    }
  });

  emit('success')
}
</script>

<template>
  <div style="padding: 1rem 0;">
    <a-textarea
      v-model:value="comment"
      :rows="12"
    />
  </div> 

  <a-row justify="end">
    <a-col>
      <a-button
        type="primary"
        @click="save"
      >
        Save
      </a-button>
    </a-col>
  </a-row>
</template>