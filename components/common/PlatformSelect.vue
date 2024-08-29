<script setup>
const options = [
  // general purpose computers
  { label: "PC", value: 6 },
  { label: "Linux", value: 3 },
  { label: "Mac", value: 14 },
  // gen 2
  { label: "A2600", value: 59 },
  // gen 3
  { label: "NES", value: 18 },
  { label: "Master System", value: 64 },
  // gen 4
  { label: "Genesis", value: 29 },
  { label: "SNES", value: 19 },
  // gen 5
  { label: "PS1", value: 7 },
  { label: "N64", value: 4 },
  // gen 6
  { label: "PS2", value: 8 },
  { label: "GameCube", value: 21 },
  { label: "Xbox", value: 11 },
  // gen 7
  { label: "X360", value: 12 },
  { label: "PS3", value: 9 },
  { label: "Wii", value: 5 },
  // gen 8
  { label: "Switch", value: 130 },  
  { label: "PS4", value: 48 },
  { label: "Xbone", value: 49 },
  // gen 9
  { label: "PS5", value: 167 },
  { label: "Xbox X/S", value: 169 },
]

const model = defineModel()
</script>

<template>
  <a-select
    :value="model"
    allow-clear
    placeholder="Platform"
    :options="options"
  />
</template>