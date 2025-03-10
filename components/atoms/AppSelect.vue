<template>
  <div class="space-y-1">
    <label class="block text-md mb-1">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <select
        v-model="model"
        class="cursor-pointer w-full border border-black bg-[#E9E9E9] rounded-xl py-4 px-3 focus:outline-none focus:ring-2 focus:border-transparent"
      >
        <option v-for="option in options" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
<script setup>
defineProps(["options", "label"]);

const model = defineModel();
</script>
<style>
.vs__dropdown-toggle {
  border: 0px !important;
}
.input {
  --vs-controls-color: rgb(0, 0, 0);

  --vs-dropdown-bg: rgb(250 250 250);
  --vs-dropdown-color: rgb(250 250 250);
  --vs-dropdown-option-color: #000;

  --vs-selected-bg: #fff;
  --vs-selected-color: #000;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #eeeeee;
  --vs-dropdown-option--active-color: #000;
}
</style>
