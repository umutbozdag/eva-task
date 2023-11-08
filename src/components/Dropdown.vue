<template>
  <div class="bg-gray-100 flex items-center justify-center z-10">
    <div class="relative inline-block text-left">
      <button id="dropdown-button" @click="isOpen = !isOpen"
        class="justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
        Last {{ store.state.selectedDay }} Days
      </button>
      <div id="dropdown-menu" v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div class="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
          <a v-for="day in days" :key="day.value"
            class="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
            role="menuitem" @click="handleChangeDay(day.value)">
            {{ day.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, inject, ref } from 'vue';
import days from '../config/days';
import { useStore } from 'vuex';
import { DayOptionsEnum } from '@/types/store/State';
import { ActionTypes } from '@/types/store/Actions';

const store = useStore();

const isOpen = ref(false);

const selectedDay: ComputedRef<DayOptionsEnum> = computed(() => store.state.selectedDay)
const handleChangeDay = async (day: number) => {
  if (day === selectedDay.value) {
    isOpen.value = false
    return
  }
  store.dispatch(ActionTypes.SET_SELECTED_DAY, day);
  isOpen.value = false;
  await store.dispatch(ActionTypes.GET_DAILY_SALES_OVERVIEW);
}

</script>