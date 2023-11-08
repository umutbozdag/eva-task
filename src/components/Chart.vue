<template>
  <div class="bg-white p-8 pt-2 rounded-lg">
    <chart-header title="Daily Sales" />
    <div id="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef, computed, onMounted, toRaw, watch } from 'vue';
import { Store, useStore } from 'vuex';
import ChartHeader from './ChartHeader.vue';
import { DailySalesOverviewData, DailySalesOverviewItemEntity } from '@/types/api/DailySalesOverviewTypes';
import HighchartsFacade from '@/utils/HighchartsFacade';
import RootState from '@/types/store/State';

const store: Store<RootState> = useStore();

const dailySalesOverview: ComputedRef<DailySalesOverviewData | null> = computed(() => store.state.dailySalesOverview);
const currency: ComputedRef<DailySalesOverviewData['Currency'] | undefined> = computed(() => dailySalesOverview.value?.Currency);

const highchartsFacade = new HighchartsFacade(currency.value ? currency.value : '', store);

onMounted(() => {
  highchartsFacade.createChart('chart', dailySalesOverview.value?.item);
  updateChart(dailySalesOverview.value?.item);
})

const updateChart = (data: DailySalesOverviewItemEntity[] | null | undefined) => {
  if (data) {
    highchartsFacade.updateChart(data);
  }
};

watch(() => store.state.dailySalesOverview, (newData) => {
  newData && updateChart(toRaw(newData).item);
}, {
  immediate: true
})

</script>