<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <button @click="prevPage" :disabled="currentPage === 1"
          class="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
          Previous
        </button>
      </li>
      <li>
        <span class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-black border0">Page
          {{ currentPage }}</span>
      </li>
      <li @click="nextPage" :disabled="currentPage === totalPages">
        <button href="#"
          class="flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { MutationTypes } from "@/types/store/Mutations";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentPage = computed(() => store.state.currentPage);
const totalPages = computed(() => store.getters.totalPages);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    store.commit(MutationTypes.SET_CURRENT_PAGE, currentPage.value + 1);
    store.dispatch("getDailySalesSkuList");
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    store.commit(MutationTypes.SET_CURRENT_PAGE, currentPage.value - 1);
    store.dispatch("getDailySalesSkuList");
  }
};
</script>
