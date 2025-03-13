<template>
  <div class="space-y-1">
    <label class="block text-md mb-1">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="w-full border flex border-black bg-[#E9E9E9] rounded-xl px-3">
      <div class="border-r flex gap-x-3 items-center pr-3 mr-3">
        <IconsIconSlavaUkraine /><IconsIconSelectArrow />
      </div>
      <input
        v-model="model"
        :placeholder="placeholder"
        class="focus:outline-none py-4 focus:border-transparent w-full"
      />
    </div>
  </div>
</template>

<script setup>
defineProps(["label", "placeholder"]);

const model = defineModel();
</script>
