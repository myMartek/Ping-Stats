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
      <div class="text-h6">Login</div>
    </q-card-section>
    <q-card-section>
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-input
          v-model="username"
          filled
          label="Benutzername"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Please type something'
          ]"
        />

        <q-input
          v-model="password"
          filled
          type="password"
          label="Passwort"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Please type something'
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
