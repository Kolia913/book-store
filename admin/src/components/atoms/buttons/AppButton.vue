<template>
  <button
    class="flex items-center justify-center gap-1 outline-none disabled:opacity-70 rounded-lg h-fit px-3 py-2 duration-100"
    :type="type ? type : 'button'"
    :class="{
      'bg-red-600 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400 text-white ':
        variant === 'danger',
      'bg-primary-300 hover:bg-primary-200 dark:bg-primary-dark-200 dark:hover:bg-primary-dark-300 text-white':
        variant === 'primary',
      'bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white':
        variant === 'success',
      'bg-white border border-gray-200 dark:border-grey-300 border-solid hover:bg-grey-100 dark:bg-grey-dark-50 dark:hover:bg-grey-dark-hover':
        variant === 'outline',
    }"
    @click="onClick"
  >
    <slot name="icon"></slot>
    <span class="text-sm font-semibold">{{ text }}</span>
  </button>
</template>
<script setup>
const emit = defineEmits(['onClick']);
defineProps(['text', 'variant', 'type']);

function onClick() {
  emit('onClick');
}
</script>
