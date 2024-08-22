<script setup>
import { reactive, watch } from 'vue';
import { debounce } from 'lodash-es';
import { getGames } from '../client/games'


let lastFetchId = 0;

const state = reactive({
  data: [],
  fetching: false,
});

const fetchGames = debounce(value => {
  lastFetchId += 1;
  const fetchId = lastFetchId;
  state.data = [];
  state.fetching = true;

  getGames({ name: value })
    .then((res) => {
      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }
      const data = res.data.map((game) => ({
        game,
        label: game.name,
        value: game.id,
      }));
      state.data = data;
      state.fetching = false;
    });
}, 800);


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
    show-search
    label-in-value
    placeholder="Select game"
    :filter-option="false"
    :not-found-content="state.fetching ? undefined : null"
    :options="state.data"
    @search="fetchGames"
    @select="handleSelect"
  >
    <template v-if="state.fetching" #notFoundContent>
      <a-spin size="small" />
    </template>
  </a-select>
</template>
