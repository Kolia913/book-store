<template>
  <a
    v-if="token?.length && item?.key === 'logs'"
    :href="`${logsLink}/log-viewer?token=${token}`"
    target="_blank"
    class="flex flex-row justify-start items-center gap-4 p-2 rounded-lg hover:bg-grey-100 dark:hover:bg-grey-dark-50"
    :class="
      isActive
        ? 'text-primary-300 bg-grey-100 dark:bg-grey-dark-50 dark:text-primary-dark-300'
        : undefined
    "
  >
    <div class="w-5 h-5">
      <v-icon
        :name="item.icon"
        :color="isActive ? (isDarkTheme ? '#FBBF24' : '#D97707') : '#A1A1AA'"
      />
    </div>
    <span>{{ item.title }}</span>
  </a>
  <router-link
    v-if="item?.key !== 'logs'"
    :to="item.link"
    class="flex flex-row justify-start items-center gap-4 p-2 rounded-lg hover:bg-grey-100 dark:hover:bg-grey-dark-50"
    :class="
      isActive
        ? 'text-primary-300 bg-grey-100 dark:bg-grey-dark-50 dark:text-primary-dark-300'
        : undefined
    "
  >
    <div class="w-5 h-5">
      <v-icon :name="item.icon" :color="'#A1A1AA'" />
    </div>
    <span>{{ item.title }}</span>
  </router-link>
</template>
<script setup>
import useAppConfig from '@/core/composables/useAppConfig';
import useSettingsStore from '@/stores/settings';
import { computed, onBeforeMount, ref } from 'vue';
const config = useAppConfig();

const settingsStore = useSettingsStore();
const token = ref(null);
const logsLink = ref('');

defineProps(['item', 'isActive']);

onBeforeMount(() => {
  logsLink.value = localStorage.getItem('logsLink')?.length
    ? localStorage.getItem('logsLink')
    : import.meta.env.VITE_BASE_API_START;
  token.value = localStorage.getItem(`${config.tokenName}`);
});

const isDarkTheme = computed(() => {
  if (settingsStore.currentTheme !== undefined) {
    return settingsStore.currentTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});
</script>
