<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { onBeforeMount } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import useSettingsStore from '@/stores/settings';
import { watch, shallowRef } from 'vue';
const layout = shallowRef(null);
const route = useRoute();

watch(
  () => route.meta,
  async (meta) => {
    try {
      const component = await import(`@/layouts/${meta?.layout}.vue`);
      layout.value = component?.default || MainLayout;
    } catch (e) {
      layout.value = MainLayout;
    }
  }
);

const settingsStore = useSettingsStore();

onBeforeMount(() => {
  settingsStore.changeTheme(localStorage.theme);
});
</script>
