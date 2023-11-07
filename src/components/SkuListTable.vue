<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b-2 rounded-lg">
              <tr>
                <th v-for="tableHeader in tableHeaders" :key="tableHeader.id" scope="col"
                  class="text-sm font-medium text-gray-500 px-6 py-4 text-left"
                  v-html="tableHeader.label ? tableHeader.label : tableHeader.formatter()"
                  :class="{ 'w-1/2': tableHeader.fullWidth }">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tableData in displayedTableData.skuList" :key="tableData.sku" class="bg-gray-100 border-b">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ tableData.sku }}
                </td>
                <td class="text-sm text-gray-900 px-6 py-10 w-1/2">
                  {{ tableData.productName }}
                </td>
                <!-- TODO: move to computed -->
                <td class="text-sm text-gray-900 px-6">
                  {{ displayedTableData.currency }}{{ displayedTableData.totalSales }} / {{ tableData.qty }}<br />
                  {{ displayedTableData.currency }}{{ (displayedTableData.totalSales / tableData.qty).toFixed(2) }}
                </td>
                <td class="text-sm text-gray-900 px-6">
                  {{ displayedTableData.currency }}{{ displayedTableData.totalSales2 }} / {{ tableData.qty2 }}<br />
                  {{ displayedTableData.currency }}{{ (displayedTableData.totalSales2 / tableData.qty2).toFixed(2) }}
                </td>
                <td class="text-sm text-gray-900 text-center">
                  <!-- TODO: use real data -->
                  %0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right mt-4">
          <sku-list-table-pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { createTableHeadersConfig } from '../config/table';
import SkuListTablePagination from './SkuListTablePagination.vue';

const store = useStore();

const displayedTableData = computed(() => store.getters.displayedTableData);
const firstSelectedColumn = computed(() => store.state.selectedColumns[0]);
const secondSelectedColumn = computed(() => store.state.selectedColumns[1]);
const tableHeaders = ref();

watch([firstSelectedColumn, secondSelectedColumn], ([newFirstSelectedColumn, newSecondSelectedColumn]) => {
  tableHeaders.value = createTableHeadersConfig(newFirstSelectedColumn, newSecondSelectedColumn)
}, {
  immediate: true
});
</script>