<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAppStore } from '@/stores/app.js';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const store = useAppStore();
const { t: $t } = useI18n();

const username = ref(null);
const password = ref(null);
const loading = ref(false);

const onSubmit = async() => {
  loading.value = true;

  try {
    await store.login(username.value, password.value);

    $q.notify({
      type: 'positive',
      message: $t('login.success')
    });
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: $t('login.error')
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-card class="loginForm">
    <q-card-section>
      <div class="text-h6">{{ $t('login.title') }}</div>
    </q-card-section>
    <q-card-section>
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-input
          v-model="username"
          filled
          :label="$t('login.username')"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || $t('login.pleaseFill')
          ]"
        />

        <q-input
          v-model="password"
          filled
          type="password"
          :label="$t('login.password')"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || $t('login.pleaseFill')
          ]"
        />

        <div>
          <q-btn :label="$t('login.submit')" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
