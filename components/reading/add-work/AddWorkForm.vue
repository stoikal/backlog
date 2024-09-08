<script setup>
import { Button } from '@/components/ui/button'
import LitWorkSelect from '@/components/common/LitWorkSelect.vue';
import CheckboxGroup from '@/components/common/CheckboxGroup.vue';

const emit = defineEmits(['success', 'listSuccess', 'close'])

const lists = ref([])

const loadLists = async () => {
  const res = await $fetch('/api/reading/lists')
  lists.value = res.data
}

loadLists()

const checkboxOptions = computed(() => {
  return lists.value
    .map((list) => ({
      label: list.title,
      value: list.listId
    }))
})

const selectedWork = ref(null)
const selectedLists = ref([])

const listIdsToCreate = computed(() => {
  return selectedLists.value
})

const save = async () => {
  const workKey = selectedWork.value?.value
  
  if (workKey) {
    const rawData = selectedWork.value.data

    const body = {
      key: rawData.key,
      title: rawData.title,
      firstPublishYear: rawData.first_publish_year,
      type: rawData.type,
      numberOfPagesMedian: rawData.number_of_pages_median,
      authors: rawData.author_key.map((key, index) => ({
        key,
        name: rawData.author_name[index]
      })),
      languages: rawData.language,
    }

    await $fetch('/api/reading/works', {
      method: 'POST',
      body
    })
    
    if (listIdsToCreate.value.length) {
      await $fetch(`/api/reading/works/${encodeURIComponent(workKey)}/items`, {
        method: 'POST',
        body: {
          listIds: listIdsToCreate.value
        }
      })
    }

    emit('success')

    selectedWork.value = null
    selectedLists.value = []
  }
}

const saveAndClose = async () => {
  await save()
  emit('close')
}


const isSubmitDisabled = computed(() => {
  const isChanged = listIdsToCreate.value.length > 0
  return (
    selectedWork.value === null ||
    !isChanged
  )
})
</script>

<template>
  <div class="pt-6 mb-6">
    <div class="mb-6">
      <LitWorkSelect
        v-model="selectedWork"
      />
    </div>

    <CheckboxGroup
      v-model="selectedLists"
      :options="checkboxOptions"
    />
  </div>

  <div class="text-end space-x-3">
    <Button
      variant="outline"
      :disabled="isSubmitDisabled"
      @click="save"
    >
      Save
    </Button>
    <Button
      :disabled="isSubmitDisabled"
      @click="saveAndClose"
    >
      Save and Close
    </Button>
  </div>
</template>