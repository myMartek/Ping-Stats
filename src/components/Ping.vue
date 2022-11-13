<script setup>
import { useAppStore } from '@/stores/app.js';

const store = useAppStore();

const chartOptions = {
  chart: {
    toolbar: {
      tools: {
        download: false
      }
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
  stroke: {
    curve: 'smooth',
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
};
</script>

<template>
  <div class="q-pa-md">
    <div v-for="(location, i) in store.locations" :key="i" class="row">
      <div class="col">
        <q-card class="q-mb-md">
          <apexchart
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
