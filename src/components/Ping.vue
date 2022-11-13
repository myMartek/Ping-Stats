<script setup>
import { ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useAppStore } from '@/stores/app.js';
import de from 'apexcharts/dist/locales/de.json';
import en from 'apexcharts/dist/locales/en.json';
const $q = useQuasar();

const store = useAppStore();
const chart = ref([]);

const chartOptions = computed(() => ({
  chart: {
    locales: [de, en],
    defaultLocale: $q.lang.isoName === 'de' ? 'de' : 'en',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
    style: 'hollow'
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 6
  },
  yaxis: {
    labels: {
      formatter(value) {
        return `${Math.round(value)} ms`;
      }
    }
  },
  stroke: {
    curve: 'straight',
    width: 1
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    }
  },
  legend: {
    showForSingleSeries: true
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100]
    }
  }
}));

watch(() => $q.lang.isoName, () => {
  chart.value.forEach(async(c) => {
    await c.updateOptions(chartOptions.value);
    c.refresh();
  });
});
</script>

<template>
  <div class="q-pa-md">
    <div v-for="(location, i) in store.locations" :key="i" class="row">
      <div class="col">
        <q-card class="q-mb-md">
          <apexchart
            ref="chart"
            width="100%"
            height="200"
            type="area"
            :options="chartOptions"
            :series="[{ data: location.history, name: location.address }]"
          />
        </q-card>
      </div>
    </div>
  </div>
</template>

<style class="scss" scoped>
</style>
