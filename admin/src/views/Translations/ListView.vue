<template>
  <breadcrumbs :breadcrumbs="breadcrumbsData" />
  <div class="pt-2">
    <page-title text="Статті" />
  </div>
  <div class="w-full flex flex-row justify-end items-center">
    <AppButton
      text="Додати"
      variant="primary"
      class="w-24"
      @on-click="$router.push('/articles/create')"
    />
  </div>
  <div class="flex flex-col gap-y-8 mt-4">
    <AppTable
      name="news"
      :columns="tableColumns"
      :data="articleData"
      :options="tableOptions"
      dataPrimaryKey="id"
      @changePage="changePage"
      @changePerPage="changePerPage"
      @on-sort="sortData"
      @on-edit="(id) => $router.push(`/articles/${id}/edit`)"
      @on-delete="onDeleteArticle"
    >
      <template #id="{ item }">
        <span>{{ item.id }}</span>
      </template>
      <template #title="{ item }">
        <span>{{ item.title }}</span>
      </template>
      <template #on_main_page="{ item }">
        <AppStatus :status="item.on_main_page" />
      </template>
      <template #status="{ item }">
        <AppStatus :status="item.status" />
      </template>
      <template #published_at="{ item }">
        <AppFormatDate :date="item.published_at" />
      </template>
      <template #updated_at="{ item }">
        <AppFormatDate :date="item.updated_at" />
      </template>
    </AppTable>
  </div>
</template>
<script setup>
import AppTable from '@/components/general/AppTable.vue';
import AppStatus from '@/components/general/AppStatus.vue';
import AppFormatDate from '@/components/general/AppFormatDate.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import { useTranslationsStore } from '@/stores/translations';
import { onMounted, ref, reactive, shallowRef } from 'vue';

const store = useTranslationsStore();

const translationsData = ref([]);

const breadcrumbsData = shallowRef([
  {
    title: 'Переклади',
    link: { name: 'TranslationsList' },
  },
  {
    title: 'Список',
    link: { name: 'TranslationsList' },
  },
]);

const tableColumns = reactive([
  {
    key: 'id',
    title: 'ІД',
    sortable: true,
  },
  {
    key: 'title',
    title: 'Назва',
    sortable: true,
  },
  {
    key: 'on_main_page',
    title: 'На головній',
  },
  {
    key: 'status',
    title: 'Статус',
    sortable: true,
  },
  {
    key: 'published_at',
    title: 'Створення',
    sortable: true,
  },
  {
    key: 'updated_at',
    title: 'Оновлення',
    sortable: true,
  },
]);

const tableOptions = reactive({
  mainCol: 'title',
  searchbar: false,
  selectable: true,
  paginated: true,
  pagination: {},
  itemsAlignment: 'start',
  actions: ['edit', 'delete'],
});

onMounted(() => {
  fetchData;
});

function fetchData() {
  store.fetchMany().then((data) => {
    translationsData.value = data;
  });
}
function onDeleteArticle(id) {
  store.remove(id).then(() => {
    fetchData;
  });
}
</script>
