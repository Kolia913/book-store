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
        :type="type"
        class="w-full border border-[#b4b4b4] bg-white rounded-xl py-4 px-3 focus:outline-none"
      />
      <div v-if="error" class="text-red-500 text-sm absolute top-[100%]">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["label", "placeholder", "type", "error"]);

const model = defineModel();
</script>

<style scoped></style>
