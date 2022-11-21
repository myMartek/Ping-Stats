<script setup>
import { ref, watch, computed } from 'vue';
import { useAppStore } from '@/stores/app.js';
import { useQuasar } from 'quasar';
import de from 'apexcharts/dist/locales/de.json';
import en from 'apexcharts/dist/locales/en.json';
import moment from 'moment';

const store = useAppStore();
const $q = useQuasar();

const chart = ref(null);
const props = defineProps({
  location: {
    type: Object,
    required: true
  }
});
const history = computed(() => props.location.history.map(e => typeof e === 'number' ? [e, null] : e).filter(e => e[0] > moment().subtract(store.duration, 'minutes').valueOf()));
const annotations = computed(() => {
  let res = props.location.history.reduce((acc, e) => {
    if (typeof e === 'number' && acc.last !== null) {
      acc.areas.push({
        x: acc.last[0],
        x2: e,
        fillColor: '#90a4ae',
        opacity: 0.2
      });
    } else if (typeof e !== 'number' && e[1] === null && acc.start === null && acc.last !== null) {
      acc.start = acc.last[0];
    } else if (typeof e !== 'number' && e[1] === null && acc.start === null && acc.last === null) {
      acc.start = e[0];
    } else if (typeof e !== 'number' && e[1] !== null && acc.start !== null) {
      acc.areas.push({
        x: acc.start,
        x2: e[0],
        fillColor: '#f44336',
        opacity: 1
      });

      acc.start = null;
    }

    acc.last = e;

    return acc;
  }, { last: null, start: null, areas: [] });

  return res.areas;
});

const chartOptions = computed(() => ({
  chart: {
    locales: [de, en],
    defaultLocale: $q.lang.isoName === 'de' ? 'de' : 'en',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  annotations: {
    xaxis: annotations.value
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
    style: 'hollow'
  },
  xaxis: {
    min: moment().subtract(store.duration, 'minutes').valueOf(),
    max: store.maxDuration,
    type: 'datetime',
    tickAmount: 6
  },
  yaxis: {
    min: 0,
    max: store.maxMS,
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
    enabled: false,
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

watch(() => $q.lang.isoName, async() => {
  if (chart.value) {
    await chart.value.updateOptions(chartOptions.value);
    chart.value.refresh();
  }
});
</script>

<template>
  <apexchart
    ref="chart"
    width="100%"
    height="200"
    type="area"
    :options="chartOptions"
    :series="[{ data: history, name: props.location.address }]"
  />
</template>

<style class="scss" scoped>
</style>
