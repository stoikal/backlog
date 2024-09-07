<script setup>
import { Checkbox } from '@/components/ui/checkbox'

const props = defineProps({
  options: Array
})

const model = defineModel()

const isChecked = (option) => {
  return model.value?.includes(option.value)
}

const handleCheckboxChange = (option, checked) => {
  if (checked) {
    model.value =[...model.value, option.value]
  } else {
    model.value = model.value.filter((i) => i !== option.value)
  }
}

</script>

<template>
  <div class="flex flex-wrap gap-y-2 gap-x-4">
    <template v-for="option in props.options" :key="option.value">
      <span class="items-top flex space-x-2">

        <Checkbox
          :checked="isChecked(option)"
          @update:checked="handleCheckboxChange(option, $event)"
        />
        <label>{{  option.label }}</label>
      </span>
    </template>
  </div>
</template>