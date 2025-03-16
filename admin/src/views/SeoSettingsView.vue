<template>
  <breadcrumbs :breadcrumbs="breadcrumbsData" />
  <div class="pt-2">
    <page-title :text="`Seo Налаштування`" />
  </div>
  <AppCard v-if="settingsData?.length" class="p-4 mt-4">
    <div class="flex flex-col justify-start gap-y-6">
      <div
        v-for="(setting, idx) in settingsData"
        :key="setting.id"
        class="flex flex-col justify-start gap-y-4 border-b last-of-type:border-none pb-8 last-of-type:pb-0 border-gray-200 dark:border-grey-300"
      >
        <AppPlainInput
          v-model="settingsData[idx].title"
          :disabled="true"
          type="text"
          label="Admin title"
        />
        <div class="flex flex-col">
          <span class="block mb-2 text-xs text-gray-500 dark:text-gray-400">Статус</span>
          <AppToggleInput v-model="settingsData[idx].status" />
        </div>
        <AppPlainInput v-model="settingsData[idx].key" :disabled="true" type="text" label="Key" />
        <AppTextarea
          v-if="settingsData[idx].key !== 'seo_short_cuts'"
          v-model="settingsData[idx].value.code"
          type="text"
          :label="setting.admin_title"
        />
        <div v-else class="flex flex-col justify-start gap-y-4">
          <div v-for="(shortcut, index) in settingsData[idx].value" :key="'shortcut_' + index">
            <AppTextarea
              :label="getShortcutTitleFromKey(findShortcutModelKey(settingsData[idx].value[index]))"
              v-model="
                settingsData[idx].value[index][findShortcutModelKey(settingsData[idx].value[index])]
              "
            />
            <span class="text-sm font-light"
              ><span class="text-sm font-normal">Hint*:&nbsp;</span>{{ shortcut.hint }}</span
            >
          </div>
        </div>
        <AppButton
          @onClick="saveSetting(setting.id)"
          variant="success"
          type="button"
          text="Save"
          class="mt-2"
        />
      </div>
    </div>
  </AppCard>
</template>
<script setup>
import AppCard from '@/components/general/AppCard.vue';
import AppPlainInput from '@/components/atoms/inputs/form/AppPlainInput.vue';
import AppTextarea from '@/components/atoms/inputs/form/AppTextarea.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import AppToggleInput from '@/components/atoms/inputs/form/AppToggleInput.vue';
import useSeoSettingsStore from '@/stores/seoSettings';
import { reactive, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const seoSettingsStore = useSeoSettingsStore();

const settingsData = ref([]);

const breadcrumbsData = reactive([
  {
    title: 'Seo Налаштування',
    link: { name: 'SeoSettings' },
  },
]);

onMounted(() => {
  seoSettingsStore.fetchSeoSettings().then((res) => {
    settingsData.value = res.result.data;
  });
});

function saveSetting(id) {
  const payload = settingsData.value.find((item) => item.id === id);
  if (payload) {
    seoSettingsStore.updateSetting({ id, payload });
  } else {
    toast.error('Setting id not found :(');
  }
}

function findShortcutModelKey(shortcutHintKeyPair) {
  return Object.keys(shortcutHintKeyPair).find((item) => item !== 'hint');
}

function getShortcutTitleFromKey(key) {
  const title = key.replaceAll('_', ' ');
  return title.charAt(0).toUpperCase() + title.slice(1, title.length);
}
</script>
