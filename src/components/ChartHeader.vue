<template>
  <div class="flex mb-10 align-middle justify-between items-center p-2">
    <h1 class="text-2xl font-extrabold">{{ props.title }}</h1>
    <dropdown />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Dropdown from './Dropdown.vue';
const props = defineProps({
  title: String
})
</script>