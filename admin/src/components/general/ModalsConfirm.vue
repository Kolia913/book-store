<template>
  <div class="modal">
    <div class="modal__bck z-1" @click="$emit('close')" />
    <div class="relative shadow-sm py-5 px-7 rounded z-2 bg-white dark:bg-grey-dark-50">
      <h2 class="text-black dark:text-white text-xl pb-3 text-center">Підтвердження дії</h2>
      <span
        class="modal__close before:bg-black dark:before:bg-white after:bg-black dark:after:bg-white"
        @click="$emit('close')"
      />
      <div class="modal__content">
        <p class="text-center text-black dark:text-white mb-5">
          {{ confirmText }}
        </p>
        <div class="my-3 flex justify-center gap-4 items-center">
          <AppButton
            type="button"
            text="Скасувати"
            variant="danger"
            @click="() => $emit('confirmStatus', false)"
          />

          <AppButton
            type="button"
            text="Підтвердити"
            variant="success"
            @click="() => $emit('confirmStatus', true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AppButton from '../atoms/buttons/AppButton.vue';

defineProps({
  confirmText: {
    default: 'You confirm this ?',
    type: String,
  },
});
</script>
<style lang="scss" scoped></style>
