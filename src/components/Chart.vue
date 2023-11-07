<template>
  <div class="bg-white p-8 pt-2 rounded-lg">
    <chart-header />
    <div id="chart"></div>
    <!-- <charts :options="options"></charts> -->
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import ChartHeader from './ChartHeader.vue';
import { formatDate } from '../utils/date';
import { DailySalesOverviewData, DailySalesOverviewItemEntity } from '@/types/api/DailySalesOverviewTypes';
import ChartAdapter from '../utils/ChartAdapter';
import Highcharts from 'highcharts'

const chart = ref()

const store = useStore();
const chartAdapter = new ChartAdapter();

const dailySalesOverview: DailySalesOverviewData = computed(() => store.state.dailySalesOverview).value;
const hcInstance = ref(null);

const updateChart = (data: DailySalesOverviewItemEntity[]) => {
  // Update categories and series data
  options.series = chartAdapter.getSeries(data);
  options.xAxis.categories = chartAdapter.getCategories(data);
};

const currency = computed(() => dailySalesOverview.Currency);

// TODO: Check any's
const options: Highcharts.Options = {
  title: {
    text: ''
  },
  chart: {
    type: 'column',
    backgroundColor: '#fff',
  },
  xAxis: {
    // dates
    categories: [],
    type: 'datetime',
    labels: {
      style: {
        color: 'black',
        fontSize: '12px',
        fontWeight: 'bold'
      },
      formatter: function () {
        return formatDate(this.value);
      }
    },
  },
  yAxis: {
    min: 0,
    gridLineWidth: 1,
    gridLineDashStyle: 'LongDashDot',
    title: {
      text: `Amount (${currency.value})`,
      style: {
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    },
    stackLabels: {
      enabled: true,
    },
    labels: {
      formatter: function () {
        if (this.value) return `${this.value}k`
        return this.value
      },
      style: {
        color: 'black'
      }
    }
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: ` Total Sales: {point.custom.totalSales}<br/>Shipping: {point.custom.shipping}<br/>Profit: {point.custom.profit}<br/>FBA Sales: {point.custom.fbaSales}<br/>FBM Sales: {point.custom.fbmSales}<br/>
    `
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      minPointLength: 3,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#fff',
        backgroundColor: 'red',
        align: 'right',
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
        }
      },
      allowPointSelect: true,
      states: {
        select: {
        }
      }
    },
    series: {
      cursor: 'pointer',
      allowPointSelect: true,
      pointWidth: 25,
      states: {
        select: {
          enabled: true,
          color: 'blue',
        }
      },
      dataLabels: {
        format: `${currency.value}{y}`
      },
      point: {
        events: {
          click: async function () {
            console.log('clicked')
            await store.dispatch('setSelectedColumns', this.category);

            // this.series.points.forEach((point) => {
            //   point.update({
            //     color: null,
            //   });
            // });

            // this.update({
            //   color: 'red', // Change the color to red
            // });
          },
          select: function () {
            const selectedPoints = hcInstance.value.getSelectedPoints()
            console.log(selectedPoints[0])
          }
        }
      }
    }
  },
  series: []
};

onMounted(() => {
  hcInstance.value = Highcharts.chart('chart', options);
})

watch(() => store.state.dailySalesOverview, (newData) => {
  updateChart(toRaw(newData).item);
}, {
  immediate: true
})

</script>../utils/ChartAdapter