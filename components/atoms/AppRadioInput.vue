<template>
  <label
    class="flex items-center justify-start border border-[#b4b4b4] bg-white rounded-xl py-4 px-3 mb-2 cursor-pointer"
  >
    <input
      type="radio"
      v-model="model"
      :value="value"
      :name="name"
      class="mr-3 h-5 w-5 text-black ring-black"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script setup>
defineProps(["label", "value", "name"]);
const model = defineModel();
</script>
