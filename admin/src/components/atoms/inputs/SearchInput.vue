<template>
  <div class="text-base h-fit relative rounded-lg border dark:border-grey-300 z-0">
    <SearchIcon class="w-5 h-5 absolute top-2 left-2" />
    <input
      type="text"
      placeholder="Пошук"
      class="w-full rounded-lg pl-9 pr-2 text-base py-1.5 dark:bg-grey-dark-50"
      :name="name"
      v-model="model"
      @input="onInput"
    />
  </div>
</template>
<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue';
defineProps(['name']);
const emit = defineEmits(['input']);
const model = defineModel();

function onInput(event) {
  emit('input', event);
}
</script>
