<script setup>
import { useAppStore } from '@/stores/app.js';
import Statistics from '@/components/Statistics.vue';

const store = useAppStore();
</script>

<template>
  <div class="q-pa-md">
    <div v-for="(location, i) in store.locations" :key="i" class="row">
      <div class="col">
        <q-card class="q-mb-md">
          <Statistics :location="location" />
        </q-card>
      </div>
    </div>
  </div>
</template>

<style class="scss" scoped>
</style>
