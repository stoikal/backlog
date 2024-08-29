<script setup>
import { reactive, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core'

let lastFetchId = 0;

//  INI ADALAH COMMENT

const props = defineProps({
  size: String,
})

const state = reactive({
  data: [],
  fetching: false,
});

const getReleaseYear = (game = {}) => {
  if (!game.firstReleaseDate) return 'N/A'

  return new Date(game.firstReleaseDate * 1000)
    .getFullYear()
}

const fetchGames = (name) => {
  lastFetchId += 1;
  const fetchId = lastFetchId;
  state.data = [];
  state.fetching = true;

  $fetch('/api/games', { params: { search: name }})
    .then((res) => {
      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = res.data.map((game) => ({
        data: game,
        label: `${game.name} (${getReleaseYear(game)})`,
        value: game.id,
      }));

      state.data = data;
      state.fetching = false;
    });
};

const debouncedFetchGames = useDebounceFn(fetchGames, 800)

const model = defineModel()
watch(() => model.value, () => {
  state.data = [];
  state.fetching = false;
});

const handleSelect = (value) => {
  model.value = value
}
</script>

<template>
  <a-select
    :value="model"
    :size="props.size || 'middle'"
    show-search
    label-in-value
    placeholder="Select game"
    :filter-option="false"
    :not-found-content="state.fetching ? undefined : null"
    :options="state.data"
    @search="debouncedFetchGames"
    @select="handleSelect"
  >
    <template v-if="state.fetching" #notFoundContent>
      <a-spin size="small" />
    </template>
  </a-select>
</template>
