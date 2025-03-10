<template>
  <div class="space-y-1">
    <label class="block text-md mb-1">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        v-model="model"
        :placeholder="placeholder"
        class="w-full border border-black bg-[#E9E9E9] rounded-xl py-4 px-3 focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  </div>
</template>

<script setup>
defineProps(["label", "placeholder"]);

const model = defineModel();
</script>
