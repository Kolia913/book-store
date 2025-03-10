<template>
  <button
    class="flex justify-center items-center gap-4 w-fit h-fit rounded-3xl py-4 px-8 text-xl cursor-pointer duration-200"
    :class="{
      'bg-primary-red  text-white hover:bg-red-800': color === 'red',
      'bg-white text-black hover:bg-gray-200': color === 'white',
      'bg-[#ABE19D] border rounded-lg text-black hover:bg-[#ABE19D]':
        color === 'green',
      'bg-black text-white hover:bg-gray-800': color === 'black',
    }"
    v-bind="$attrs"
  >
    <slot name="icon" />
    <span>{{ value }}</span>
  </button>
</template>
<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: "red",
    validator: (val) => ["red", "white"].includes(val),
  },
});
</script>
