<script setup>
import { useQuasar } from 'quasar';
import languages from 'quasar/lang/index.json';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import Ping from './components/Ping.vue';

const appLanguages = languages.filter(lang =>
  [ 'de', 'en-US' ].includes(lang.isoName)
);

const { locale } = useI18n({ useScope: 'global' });

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}));

const $q = useQuasar();
const lang = ref('de');

function __variableDynamicImportRuntime__(path) {
  switch (path) {
  case 'quasar/lang/en-US.mjs':
    return import('quasar/lang/en-US.mjs');
  case 'quasar/lang/de.mjs':
    return import('quasar/lang/de.mjs');
  default:
    return new Promise(function(resolve, reject) {
      queueMicrotask(reject.bind(null, new Error('Unknown variable dynamic import: ' + path)));
    });
  }
}

function importLocale(locale) {
  return __variableDynamicImportRuntime__(`quasar/lang/${locale}.mjs`);
}

watch(lang, val => {
  // dynamic import, so loading on demand only
  importLocale(val).then(lang => {
    $q.lang.set(lang.default);
    locale.value = val;
  });
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{ $t('app.title') }}
        </q-toolbar-title>

        <q-space />

        <q-select
          v-model="lang"
          :options="langOptions"
          :label="$t('options.language')"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered>
      test
    </q-drawer>

    <q-page-container>
      <Ping />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
</style>
