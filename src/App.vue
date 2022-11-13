<script setup>
import { useQuasar } from 'quasar';
import languages from 'quasar/lang/index.json';
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import { useAppStore } from '@/stores/app.js';

import Ping from '@/components/Ping.vue';
import Login from '@/components/Login.vue';

const store = useAppStore();
const $q = useQuasar();

const appLanguages = languages.filter(lang =>
  [ 'de', 'en-US' ].includes(lang.isoName)
);

const { locale } = useI18n({ useScope: 'global' });

const langOptions = appLanguages.map(lang => ({
  label: lang.nativeName, value: lang.isoName
}));

const lang = ref($q.lang.getLocale() === 'de-DE' ? 'de' : 'en-US');

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
    <q-header elevated class="bg-primary text-white">
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
          label-color="white"
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        />

        <q-btn v-if="store.loggedIn" :label="$t('login.logout')" flat @click="store.logout" />
      </q-toolbar>
    </q-header>

    <template v-if="store.loggedIn">
      <q-drawer show-if-above side="left" bordered>
        test
      </q-drawer>

      <q-page-container>
        <Ping />
      </q-page-container>
    </template>

    <q-page-container v-else>
      <Login />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.loginForm {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 15px;
}
</style>

<style lang="scss">
.q-field span, .q-field .q-select__dropdown-icon {
  color: white;
}
</style>
