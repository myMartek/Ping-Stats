<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/app.js';

const store = useAppStore();

const target = ref(null);

const addLocation = (value) => {
  store.sendSocket('addLocation', value);
  target.value = null;
};

const validateInput = (value) => {
  return value !== null // Value is not equal to initial value
    && value.length > 0 // Value is not empty
    && (/^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(value) // Value is a valid IP address
      || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(value)); // Value is a valid domain name
};
</script>

<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-btn icon="mdi-plus" class="full-width" color="positive" :label="$t('location.add')" />
        <q-popup-edit v-slot="scope" v-model="target" persistent :validate="validateInput" :cover="false" :offset="[0, 10]">
          <q-input v-model="scope.value" color="primary" dense autofocus @keyup.enter="scope.set">
            <template #prepend>
              <q-icon name="mdi-server" color="primary" />
            </template>

            <template #after>
              <q-btn
                flat dense color="negative" icon="mdi-close"
                @click.stop.prevent="scope.cancel"
              />

              <q-btn
                flat dense icon="mdi-check"
                color="positive"
                :disable="scope.validate(scope.value) === false"
                @click.stop.prevent="scope.set(scope.value); addLocation(scope.value)"
              />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </div>

    <q-list bordered class="rounded-borders">
      <template v-for="(location, i) in store.locations" :key="i">
        <q-item>
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ location.address }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              ø 10 ms
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="mdi-delete" @click="store.sendSocket('removeLocation', location.address)" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator v-if="i < store.locations.length - 1" spaced />
      </template>
    </q-list>
  </div>
</template>

<style lang="scss">
.q-btn.text-positive i {
  color: var(--q-positive) !important;
}

.q-btn.text-negative i {
  color: var(--q-negative) !important;
}
</style>
