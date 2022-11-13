<script setup>
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Ping stats
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      test
    </q-drawer>

    <q-page-container>
      test
    </q-page-container>
  </q-layout>
</template>

<style class="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
