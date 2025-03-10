<template>
  <div
    class="flex items-center justify-start border border-black bg-[#E9E9E9] rounded-xl py-4 px-3 mb-2"
  >
    <input
      type="radio"
      v-model="model"
      :value="value"
      :name="name"
      class="mr-3 h-5 w-5 text-black ring-black"
    />
    <label>
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps(["label", "value", "name"]);

const model = defineModel();
</script>
