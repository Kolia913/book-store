<template>
  <div class="space-y-1">
    <label class="block text-md mb-1">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <v-select
        :options="options"
        v-model="model"
        :label="labelKey"
        :reduce="(option) => option[valueKey]"
        :placeholder="placeholder"
        :searchable="searchable"
        class="input w-full border border-[#b4b4b4] bg-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:border-transparent"
        @search="handleSearch"
      >
        <template v-slot:no-options>Результатів не знайдено.</template>
      </v-select>

      <div v-if="error" class="text-red-500 text-sm absolute top-[100%]">
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { debounce } from "lodash";

defineProps([
  "options",
  "label",
  "placeholder",
  "error",
  "labelKey",
  "valueKey",
  "searchable",
]);
const emit = defineEmits(["search"]);
const model = defineModel();

const handleSearch = debounce((query) => {
  emit("search", query);
}, 300);
</script>
<style>
.vs__dropdown-toggle {
  border: 0px !important;
}
.input {
  --vs-controls-color: rgb(0, 0, 0);

  --vs-dropdown-bg: rgb(250 250 250);
  --vs-dropdown-option-color: #000;

  --vs-selected-bg: #fff;
  --vs-selected-color: #000;

  --vs-dropdown-option--active-bg: #eeeeee;
  --vs-dropdown-option--active-color: #000;

  --vs-search-input-placeholder-color: #777777;
}
.vs__selected {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  max-width: 95%;
}
</style>
