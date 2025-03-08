<template>
  <button
    class="w-fit h-fit rounded-xl py-[10px] px-10 text-3xl cursor-pointer duration-200 border border-solid"
    :class="{
      'border-black text-black hover:bg-black hover:text-white':
        color === 'black',
      'border-white text-white hover:bg-white hover:text-black':
        color === 'white',
      'border-black text-white bg-black hover:bg-white hover:text-black':
        color === 'filled',
    }"
    v-bind="$attrs"
  >
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
    validator: (val) => ["white", "black"].includes(val),
  },
});
</script>
