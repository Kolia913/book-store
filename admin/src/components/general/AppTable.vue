<template>
  <div
    class="w-full max-w-7xl flex flex-col justify-start items-center rounded-lg bg-white dark:bg-grey-dark-100 border dark:border-white/10"
  >
    <div
      v-if="options?.searchbar"
      class="w-full flex justify-between items-center py-3 sm:px-4 px-3 gap-x-2"
    >
      <div class="relative">
        <transition name="fade">
          <app-button
            variant="outline"
            text="Bulk actions"
            class="hidden sm:flex justify-self-start"
            v-if="selectedKeys.length > 0"
            @click="isBulkDropdownOpen = true"
          >
            <template #icon>
              <BulkActionsIcon class="w-5 h-5" />
            </template>
          </app-button>
        </transition>
        <transition name="fade">
          <div
            v-if="selectedKeys.length > 0"
            class="px-2 py-2 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 block sm:hidden duration-200"
            @click="isBulkDropdownOpen = true"
          >
            <BulkActionsIcon class="w-5 h-5" />
          </div>
        </transition>
        <transition name="fade">
          <div
            class="border dark:border-white/10 shadow-lg p-1 rounded-lg absolute left-0 top-11 bg-white dark:bg-grey-dark-100 w-fit z-10"
            v-if="isBulkDropdownOpen"
            v-click-outside="() => (isBulkDropdownOpen = false)"
          >
            <div
              @click="deleteSelected"
              class="bg-transparent duration-100 text-red-600 dark:text-red-400 hover:bg-red-600/10 dark:hover:bg-red-400/10 rounded-lg flex flex-row justify-start gap-x-1 items-center whitespace-nowrap p-2 cursor-pointer w-52"
            >
              <DeleteIcon class="w-5 h-5" />
              <span class="text-sm">Delete selected</span>
            </div>
          </div>
        </transition>
      </div>
      <div class="relative flex flex-row justify-end gap-x-2">
        <SearchInput :name="`${name}-searchbar`" ref="searchInput" v-model="localQuery" />
        <!-- <div
          class="relative flex flex-row items-center hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg cursor-pointer duration-200"
        >
          <FilterIcon class="w-9 px-2 h-5" />
        </div> -->
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="selectedKeys.length > 0"
        class="w-full h-auto flex flex-col justify-between gap-y-1 bg-gray-50 px-3 py-2 dark:bg-white/5 sm:flex-row sm:items-center sm:px-6 sm:py-1.5 border-t border-gray-200 dark:border-white/10"
      >
        <span class="text-sm font-medium leading-6 text-gray-700 dark:text-gray-200"
          >{{ selectedKeys.length }}
          {{ selectedKeys.length % 10 === 1 ? 'record' : 'records' }} selected
        </span>
        <div class="flex gap-x-3">
          <span
            @click="selectAll"
            class="relative inline-flex items-center justify-center font-semibold outline-none transition duration-75 hover:underline focus:underline gap-1.5 text-sm text-primary-300 dark:text-primary-dark-300 cursor-pointer"
            >Select all {{ data.length }}</span
          >
          <span
            @click="deselectAll"
            class="relative inline-flex items-center justify-center font-semibold outline-none transition duration-75 hover:underline focus:underline text-sm text-red-600 dark:text-red-400 cursor-pointer"
            >Deselect all</span
          >
        </div>
      </div>
    </transition>
    <div class="w-full max-w-7xl overflow-x-auto">
      <table
        class="border-y dark:border-white/10 table-auto scrollbar-thin scrollbar-track-grey-bg dark:scrollbar-track-grey-dark-50 scrollbar-thumb-grey-200 dark:scrollbar-thumb-gray-800"
      >
        <thead class="border-b dark:border-white/10 bg-gray-50 dark:bg-white/5">
          <tr>
            <th
              v-if="options.selectable"
              class="pl-4 py-3.5 text-sm font-semibold"
              :class="{
                'text-start': options.itemsAlignment === 'start' || !options?.itemsAlignment,
                'text-end': options.itemsAlignment === 'end',
                'text-center': options.itemsAlignment === 'center',
              }"
            >
              <AppCheckbox
                value="all"
                :name="`${name}_checkbox_all`"
                :defaultChecked="selectedKeys?.length === data?.length"
                @onCheck="onSelect"
              />
            </th>
            <th
              v-for="item in activeColumns"
              :key="item.key"
              class="py-3.5 last-of-type:pr-4 first-of-type:pl-4 px-4 whitespace-nowrap w-1"
              :class="{
                'text-start': options.itemsAlignment === 'start' || !options?.itemsAlignment,
                'text-end': options.itemsAlignment === 'end',
                'text-center': options.itemsAlignment === 'center',
              }"
            >
              <span class="text-sm font-semibold">{{ item.title }}</span>
              <button v-if="item.sortable" @click="sortCol(item.key)" class="w-5 h-5 ml-2">
                <ArrowIcon
                  class="w-2.5 h-2.5 transition-transform duration-200 inline-block align-middle"
                  :class="{
                    'rotate-0':
                      route.query.sort === item.key &&
                      (route.query.by === 'asc' || !route.query.by?.length),
                    'rotate-180': route.query.sort !== item.key || route.query.by === 'desc',
                  }"
                />
              </button>
            </th>
            <th v-if="options.actions"></th>
          </tr>
        </thead>
        <tbody
          :class="{
            'text-start': options.itemsAlignment === 'start' || !options?.itemsAlignment,
            'text-end': options.itemsAlignment === 'end',
            'text-center': options.itemsAlignment === 'center',
          }"
        >
          <tr
            v-for="item in data"
            :key="item[dataPrimaryKey]"
            class="relative hover:bg-gray-50 text-sm font-normal border-b dark:border-white/10 dark:hover:bg-white/5 duration-100 cursor-pointer"
            :class="
              selectedKeys.includes(item[dataPrimaryKey])
                ? 'bg-gray-50 dark:bg-white/5'
                : 'bg-white dark:bg-grey-dark-100'
            "
          >
            <td
              v-if="options.selectable"
              class="py-3.5 px-4 w-1"
              :class="{
                'shadow-[inset_2px_0_0] shadow-primary-300 dark:shadow-primary-dark-300':
                  selectedKeys.includes(item[dataPrimaryKey]),
              }"
            >
              <AppCheckbox
                :value="item[dataPrimaryKey]"
                :name="`${name}_checkbox_${item[dataPrimaryKey]}`"
                @onCheck="onSelect"
                :defaultChecked="selectedKeys.includes(item[dataPrimaryKey])"
              />
            </td>
            <td
              v-for="col in activeColumns"
              @click="onAction('edit', item[dataPrimaryKey])"
              :key="col.key"
              class="py-3.5 last-of-type:pr-4 first-of-type:pl-4 px-4 whitespace-nowrap max-w-[280px] overflow-hidden text-ellipsis"
              :class="{
                'w-full max-w-[280px] overflow-hidden text-ellipsis': options.mainCol === col.key,
              }"
            >
              <slot :name="col.key" :item="item"></slot>
            </td>
            <td
              v-if="options.actions && options.actions?.length"
              class="pr-4 text-right whitespace-nowrap"
              :class="{
                'w-60': options?.actions?.length === 3,
                'w-40': options?.actions?.length === 2,
                'w-20': options?.actions?.length === 1,
              }"
            >
              <button
                v-for="action in options.actions"
                :key="action"
                @click="onAction(action, item[dataPrimaryKey])"
                class="table_btn ml-4 font-semibold"
              >
                <div
                  v-if="action === 'view'"
                  class="flex flex-row justify-start items-center gap-x-1"
                >
                  <ViewIcon class="w-4 h-4" />
                  <span class="table_btn__text text-gray-700 dark:text-gray-200">Переглянути</span>
                </div>
                <div
                  v-if="action === 'edit'"
                  class="flex flex-row justify-start items-center gap-x-1"
                >
                  <EditIcon class="w-4 h-4" />
                  <span class="table_btn__text text-primary-300 dark:text-primary-dark-300"
                    >Редагувати</span
                  >
                </div>
                <div
                  v-if="action === 'delete'"
                  class="flex flex-row justify-start items-center gap-x-1"
                >
                  <DeleteIcon class="w-4 h-4" />
                  <span class="table_btn__text text-red-600 dark:text-red-400">Видалити</span>
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-full py-3 px-4 flex justify-between items-center gap-2 md:gap-0">
      <template v-if="options.paginated">
        <span class="hidden md:inline text-xs font-normal text-gray-400 dark:text-gray-500 w-full">
          Показано з 1 по {{ perPage }} із {{ total }} результатів
        </span>
        <div class="block md:hidden w-full">
          <app-button variant="outline" text="Попередня" @on-click="goToPervPage" />
        </div>
        <div class="w-full flex justify-center items-center">
          <div
            class="flex flex-row justify-start border rounded-lg dark:border-grey-300 dark:bg-white/5 h-9 md:h-auto w-fit"
          >
            <div class="px-3 py-1.5 border-r dark:border-r-grey-300 hidden md:inline">
              <span class="text-sm dark:text-grey-200 text-grey-300">На сторінці</span>
            </div>
            <div class="p-0 rounded-r-lg relative">
              <select
                :name="`${name}_table_perpage_select`"
                class="h-full rounded-r-lg bg-transparent text-sm pl-3 pr-7 appearance-none text-black dark:text-gray-400"
                @change="(event) => changePerPage(+event.target?.value)"
              >
                <option
                  v-for="option in perPageOptions"
                  :value="option"
                  :key="option"
                  :selected="+option === +perpage"
                >
                  <span class="text-black dark:text-gray-400">{{ option }}</span>
                </option>
              </select>
              <ArrowIcon
                class="w-2.5 h-2.5 rotate-180 absolute right-3 top-3.5 pointer-events-none"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end md:hidden w-full">
          <app-button variant="outline" text="Наступна" @on-click="goToNextPage" />
        </div>
        <div class="w-full hidden md:flex justify-end items-center">
          <div
            class="flex flex-row justify-start items-center border rounded-lg dark:border-grey-300 dark:bg-white/5 w-fit"
          >
            <div
              class="py-3 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 border-r dark:border-grey-300 duration-100"
              @click="goToPervPage"
            >
              <ArrowIcon class="w-3 h-3 -rotate-90" />
            </div>
            <div
              :key="'1'"
              class="py-1.5 px-3 border-x dark:border-grey-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 duration-100"
              :class="{
                'bg-gray-50 dark:bg-white/5 ': 1 === currentPage,
              }"
              @click="goToPage(1)"
            >
              <span
                class="text-sm font-semibold"
                :class="{ 'text-primary-300 dark:text-primary-dark-300': 1 === currentPage }"
                >{{ 1 }}</span
              >
            </div>
            <div
              v-for="page in displayedPages"
              :key="page"
              class="py-1.5 px-3 border-x dark:border-grey-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 duration-100"
              :class="{
                'bg-gray-50 dark:bg-white/5 ': page === currentPage,
              }"
              @click="goToPage(page)"
            >
              <span
                class="text-sm font-semibold"
                :class="{ 'text-primary-300 dark:text-primary-dark-300': page === currentPage }"
                >{{ page }}</span
              >
            </div>
            <div
              v-if="lastPage > 1"
              :key="lastPage"
              class="py-1.5 px-3 border-x dark:border-grey-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 duration-100"
              :class="{
                'bg-gray-50 dark:bg-white/5 ': lastPage === currentPage,
              }"
              @click="goToPage(lastPage)"
            >
              <span
                class="text-sm font-semibold"
                :class="{ 'text-primary-300 dark:text-primary-dark-300': lastPage === currentPage }"
                >{{ lastPage }}</span
              >
            </div>
            <div
              class="py-3 px-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 border-l dark:border-grey-300 duration-100"
              @click="goToNextPage"
            >
              <ArrowIcon class="w-3 h-3 rotate-90" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <ModalsConfirm
    v-if="isConfirmationModalShown"
    confirmText="Підтвердіть видалення"
    @confirmStatus="deleteItem"
    @close="closeConfirmationModal"
  />
</template>
<script setup>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SearchInput from '@/components/atoms/inputs/SearchInput.vue';
import AppCheckbox from '@/components/atoms/inputs/AppCheckbox.vue';
import ViewIcon from '@/components/icons/table/ViewIcon.vue';
import EditIcon from '@/components/icons/table/EditIcon.vue';
import DeleteIcon from '@/components/icons/table/DeleteIcon.vue';
import BulkActionsIcon from '@/components/icons/table/BulkActionsIcon.vue';
import usePagination from '@/composables/usePagination';

import { computed, ref, reactive, watch, onBeforeMount } from 'vue';
import ModalsConfirm from './ModalsConfirm.vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * @typedef {Object} Column
 * @property {string} key - The key for the column, must equal the key in data entry.
 * @property {string} title - The title of the column.
 * @property {boolean} sortable - Whether the column is sortable or not.
 * @property {boolean} editable - Whether the column is editable or not.
 * @property {boolean} hidden - Whether the column is hidden or not (undefined or false to activate columns).
 */

/**
 * @typedef {Object} PaginationOptions
 * @property {number} current_page - The current page number.
 * @property {number} last_page - The last page number.
 * @property {number} per_page - The number of items per page.
 * @property {number} total - The total number of items.
 * @property {number} from - The starting index of the current page.
 * @property {number} to - The ending index of the current page.
 */

/**
 * @typedef {Object} Options
 * @property {string} mainCol - The key of the main column that takes full width.
 * @property {boolean} searchbar - Whether to display the search bar or not.
 * @property {boolean} selectable - Whether items are selectable or not.
 * @property {boolean} paginated - Whether to enable pagination or not.
 * @property {PaginationOptions} pagination - Pagination options.
 * @property {string} itemsAlignment - Alignment of items ('start', 'center', 'end').
 * @property {string[]} actions - List of actions to be displayed ('view', 'edit', 'delete').
 */

/**
 * @typedef {Object} Props
 * @property {Column[]} columns - Array of column configurations.
 * @property {Options} options - Additional options for the component.
 */

/**
 * @type {Props}
 */
const props = defineProps(['name', 'columns', 'data', 'dataPrimaryKey', 'options', 'minSearchLength']);

const emit = defineEmits([
  'on-view',
  'on-edit',
  'on-delete',
  'on-sort',
  'on-bulk',
  'changePage',
  'changePerPage',
  'on-search',
]);

const route = useRoute();
const router = useRouter();

const activeColumns = computed(() => {
  return props.columns.filter((item) => !item.hidden);
});

const PAGE_RADIUS_FROM_CURRENT_PAGE = 2;

const {
  currentPage,
  lastPage,
  perPage,
  total,
  updatePagination,
  // updateUrl,
} = usePagination();

const localQuery = ref('');

const selectedKeys = ref([]);
const perPageOptions = reactive([5, 10, 15, 25, 50]);
const perpage = ref(null);
const isBulkDropdownOpen = ref(false);
const isConfirmationModalShown = ref(false);
const idToDelete = ref(null);

const searchTimer = ref(null);

watch(
  () => props.options.pagination,
  (val) => {
    updatePagination(val);
  },
  {
    deep: true,
  }
);

watch(perPage, (val) => {
  if (!!val && val !== null) {
    perpage.value = val;
  }
});

function changePerPage(val) {
  perpage.value = +val;
  emit('changePerPage', +val);
}

watch(localQuery, (newVal, oldVal) => {
  if (newVal?.trim() === oldVal?.trim()) {
    return;
  }
  clearTimeout(searchTimer.value);
  searchTimer.value = setTimeout(() => {
    if (newVal?.trim().length >= props.minSearchLength ? props.minSearchLength : 3) {
      router.push({
        query: {
          ...route.query,
          search: newVal.trim(),
        },
      });
      emit('on-search', newVal);
    } else if (newVal?.trim().length < 1) {
      router.push({
        query: {
          ...route.query,
          search: undefined,
        },
      });
      emit('on-search', '');
    }
  }, 700);
});

onBeforeMount(() => {
  const val = route.query.search;
  if (val?.trim().length) {
    localQuery.value = val?.trim() ? val.trim() : '';
  }
});

watch(
  () => route.path,
  () => {
    localQuery.value = '';
  }
);

const displayedPages = computed(() => {
  const pages = [];
  for (
    let i = Math.max(2, currentPage.value - PAGE_RADIUS_FROM_CURRENT_PAGE);
    i <= Math.min(lastPage.value - 1, currentPage.value + PAGE_RADIUS_FROM_CURRENT_PAGE);
    i++
  ) {
    pages.push(i);
  }
  return pages;
});
function goToPage(page) {
  emit('changePage', page);
}
function goToPervPage() {
  if (currentPage.value > 1) {
    emit('changePage', currentPage.value - 1);
  }
}
function goToNextPage() {
  if (currentPage.value < lastPage.value) {
    emit('changePage', currentPage.value + 1);
  }
}

function onAction(action, id) {
  switch (action) {
    case 'view':
      emit('on-view', id);
      break;
    case 'edit':
      emit('on-edit', id);
      break;
    case 'delete':
      isConfirmationModalShown.value = true;
      idToDelete.value = id;
      break;
    default:
      return;
  }
}

function deleteItem(status) {
  if (status) {
    emit('on-delete', idToDelete.value);
    closeConfirmationModal();
  } else {
    closeConfirmationModal();
  }
}

function closeConfirmationModal() {
  idToDelete.value = null;
  isConfirmationModalShown.value = false;
}

function sortCol(key) {
  const currentSortorder = route.query['by'];
  const currentSortfield = route.query['sort'];
  const newOrder = currentSortorder === 'asc' && currentSortfield === key ? 'desc' : 'asc';
  router.push({
    query: {
      ...route.query,
      sort: key,
      by: newOrder,
    },
  });
  emit('on-sort', key, newOrder, currentPage.value, perPage.value);
}

function onSelect(value, isSelected) {
  if (value === 'all') {
    selectedKeys.value = [];
    if (isSelected) {
      const keys = props.data.map((item) => {
        return item[props.dataPrimaryKey];
      });
      selectedKeys.value = [...keys];
    }
    return;
  }
  if (isSelected) {
    selectedKeys.value.push(value);
  } else {
    const index = selectedKeys.value.findIndex((item) => item === value);
    index !== -1 && selectedKeys.value.splice(index, 1);
  }
  return;
}

function selectAll() {
  const keys = props.data.map((item) => {
    return item[props.dataPrimaryKey];
  });
  selectedKeys.value = [...keys];
}

function deselectAll() {
  selectedKeys.value = [];
}
function deleteSelected() {
  emit('on-bulk', selectedKeys.value, 'delete');
  isBulkDropdownOpen.value = false;
}
</script>
<style lang="scss" scoped>
.table_wrapper {
  min-width: 1024px;
  overflow-x: scroll;
}
.table_btn:hover .table_btn__text {
  text-decoration: underline;
}
.flip-rows-move {
  transition: transform 0.2s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
