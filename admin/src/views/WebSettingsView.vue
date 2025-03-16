<template>
  <breadcrumbs :breadcrumbs="breadcrumbsData" />
  <div class="pt-2">
    <page-title :text="`Налаштування`" />
  </div>
  <AppCard v-if="settingsData?.length" class="p-4 mt-4">
    <div class="flex flex-col justify-start gap-y-6">
      <div
        v-for="(setting, idx) in settingsData"
        :key="setting.id"
        class="flex flex-col justify-start gap-y-2 border-b last-of-type:border-none pb-8 last-of-type:pb-0 border-gray-200 dark:border-grey-300"
      >
        <AppPlainInput
          v-model="settingsData[idx].value[settingsData[idx].key]"
          type="text"
          :label="settingsData[idx].admin_title"
        />
        <AppPlainInput
          v-if="settingsData[idx].key === 'dollar_rate'"
          v-model="settingsData[idx].value.dollar_rate"
          type="text"
          label="Значення"
        />
        <AppWysiwyg
          v-if="settingsData[idx].key === 'delivery_and_payment'"
          v-model="settingsData[idx].value.delivery_and_payment"
          label="Опис"
        />
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
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import AppWysiwyg from '@/components/atoms/inputs/form/AppWysiwyg.vue';
import useWebSettingsStore from '@/stores/webSettings';
import { reactive, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const webSettingsStore = useWebSettingsStore();

const settingsData = ref([]);

const breadcrumbsData = reactive([
  {
    title: 'Налаштування',
    link: { name: 'WebSettings' },
  },
]);

onMounted(() => {
  webSettingsStore.fetchSeoSettings().then((res) => {
    settingsData.value = res.result.data;
  });
});

function saveSetting(id) {
  const payload = settingsData.value.find((item) => item.id === id);
  if (payload) {
    console.log('payload - ', payload);

    if (payload.key === 'wysiwyg_api_key') {
      localStorage.setItem('wysiwyg_api_key', payload.value[payload.key]);
    } else if (payload.key === 'logs_link') {
      localStorage.setItem('logsLink', payload.value[payload.key]);
    }
    webSettingsStore.updateSetting({ id, payload });
  } else {
    toast.error('Setting id not found :(');
  }
}

// function findShortcutModelKey(shortcutHintKeyPair) {
//   return Object.keys(shortcutHintKeyPair).find((item) => item !== 'hint');
// }

// function getShortcutTitleFromKey(key) {
//   const title = key.replaceAll('_', ' ');
//   return title.charAt(0).toUpperCase() + title.slice(1, title.length);
// }
</script>
