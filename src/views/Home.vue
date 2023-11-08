<template>
  <div class="home bg-gray-50 h-screen vl-parent">
    <loading v-if="isLoading" :is-full-page="true" v-model:active="isLoading" />
    <template v-else>
      <div v-if="store.state.dailySalesOverview" class="p-8">
        <chart />
      </div>
      <div v-if="showSkuListTable">
        <sku-list-table />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Chart from '@/components/Chart.vue';
import SkuListTable from '@/components/SkuListTable.vue';
import { computed } from 'vue';
import { Store, useStore } from 'vuex';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import RootState from '@/types/store/State';

const store: Store<RootState> = useStore();

const isLoading = computed(() => store.state.isLoading);
const hasSelectedColumns = computed(() => store.state.selectedColumns.length > 0);
const hasDailySalesSkuData = computed(() => store.state.dailySalesSkuList);

const showSkuListTable = computed(() => hasSelectedColumns.value && hasDailySalesSkuData.value)
</script>