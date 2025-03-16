<template>
  <div class="h-4 w-4 flex justify-center items-center relative">
    <input
      :name="name"
      type="checkbox"
      class="checkbox w-4 h-4 rounded border-none bg-white shadow-sm ring-1 transition duration-75 checked:ring-0 focus:ring-2 focus:ring-offset-0 disabled:pointer-events-none disabled:bg-gray-50 disabled:text-gray-50 disabled:checked:bg-current disabled:checked:text-gray-400 dark:bg-white/5 dark:disabled:bg-transparent dark:disabled:checked:bg-gray-600 text-white ring-gray-950/10 checked:bg-primary-300 focus:ring-primary-300 checked:focus:ring-primary-300/50 dark:ring-white/20 dark:checked:bg-primary-dark-200 dark:focus:ring-primary-200 dark:checked:focus:ring-primary-dark-300/70 dark:disabled:ring-white/10"
      @change="checkboxChange"
      :value="value"
      :checked="isChecked"
    />
  </div>
</template>
<script setup>
import { watch, ref } from 'vue';

const emit = defineEmits(['onCheck']);

const props = defineProps(['value', 'name', 'defaultChecked']);

const isChecked = ref(false);

watch(
  () => props.defaultChecked,
  (val) => {
    isChecked.value = val;
  }
);

function checkboxChange() {
  isChecked.value = !isChecked.value;
  emit('onCheck', props.value, isChecked.value);
}
</script>
<style lang="scss" scoped>
.checkbox:checked {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' fill='%23ffffff' viewBox='-5.5 -6.5 20 20'%3E%3Cpath d='M10.703-3.205a1.65 1.65 0 0 1 2.299.018c.309.3.483.708.497 1.138.009.43-.147.846-.438 1.163L4.254 10.132a1.657 1.657 0 0 1-2.384.045l-5.843-5.844a1.635 1.635 0 0 1-.383-.536 1.683 1.683 0 0 1-.144-.646 1.667 1.667 0 0 1 .485-1.2c.158-.158.344-.282.551-.364a1.641 1.641 0 0 1 1.294.022c.204.091.386.222.538.384l4.623 4.62 7.668-9.768c.014-.018.026-.034.044-.05z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 12px;
  background-position: center;
}
</style>
