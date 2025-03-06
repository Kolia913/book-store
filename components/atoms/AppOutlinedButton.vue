<template>
  <button
    class="w-fit h-fit rounded-xl py-[10px] px-10 text-3xl cursor-pointer duration-200"
    :class="{
      'border border-solid border-black text-black': color === 'black',
      'border border-solid border-white  text-white': color === 'white',
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
