<template>
  <breadcrumbs :breadcrumbs="breadcrumbsData" />
  <page-title :text="`Редагувати статтю`" />
  <FormWrapper @submit="onSubmit">
    <template #form>
      <AppPlainInput v-model="articleData.title" type="text" label="Назва" />
      <AppWysiwyg v-model="articleData.short_description" label="Опис" />
      <AppFileInput v-model="articleData.image.path" label="Зображення" />
      <AppDateTimeInput
        v-model="articleData.published_at"
        label="Дата публікації"
        data-tooltip="день / місяць / рік"
      />
      <MetaTagsBlock v-model="articleData.meta_tags" />
    </template>
    <template #controls>
      <div>
        <span class="block mb-2 text-xs text-gray-500 dark:text-gray-400">На головну</span>
        <AppToggleInput v-model="articleData.on_main_page" />
      </div>
      <div>
        <span class="block mb-2 text-xs text-gray-500 dark:text-gray-400">Статус</span>
        <AppToggleInput v-model="articleData.status" />
      </div>
      <AppButton type="submit" variant="primary" text="Зберегти" />
    </template>
  </FormWrapper>
</template>
<script setup>
import AppPlainInput from '@/components/atoms/inputs/form/AppPlainInput.vue';
import AppWysiwyg from '@/components/atoms/inputs/form/AppWysiwyg.vue';
import AppFileInput from '@/components/atoms/inputs/form/AppFileInput.vue';
import AppDateTimeInput from '@/components/atoms/inputs/form/AppDateTimeInput.vue';
import MetaTagsBlock from '@/components/forms/MetaTagsBlock.vue';
import AppToggleInput from '@/components/atoms/inputs/form/AppToggleInput.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import FormWrapper from '@/components/forms/FormWrapper.vue';
import { useTranslationsStore } from '@/stores/translations';
import { reactive, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useTranslationsStore();

const articleData = ref({
  title: '',
  short_description: '',
  published_at: '',
  image: {
    path: '',
  },
  on_main_page: true,
  status: true,
  meta_tags: {
    h1: '',
    description: '',
    title: '',
  },
});

const breadcrumbsData = reactive([
  {
    title: 'Статті',
    link: { name: 'TranslationsList' },
  },
  {
    title: route.params.id,
    link: { name: 'TranslationsEdit', params: { id: route.params.id } },
  },
  {
    title: 'Редагування',
    link: { name: 'TranslationsEdit', params: { id: route.params.id } },
  },
]);

onBeforeMount(() => {
  store.fetch(route.params.id).then((res) => {
    articleData.value = {
      ...res,
      image: {
        path: res?.image?.path ? res.image.path : '',
      },
    };
  });
});

function onSubmit() {
  const payload = { ...articleData.value };
  store.update({ id: route.params.id, payload });
}
</script>
