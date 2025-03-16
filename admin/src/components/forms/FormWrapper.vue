<template>
  <form @submit.prevent="onSubmit" class="flex justify-start gap-4 mt-4 flex-col md:flex-row">
    <AppCard class="w-full max-h-[78vh] overflow-auto">
      <div class="flex flex-col justify-start gap-4 p-4">
        <slot name="form"></slot>
      </div>
    </AppCard>
    <AppCard class="p-4 h-fit">
      <div class="flex flex-col justify-start gap-y-3 w-52">
        <slot name="controls"></slot>
        <AppButton variant="danger" type="button" text="Вийти" @on-click="goBack" />
      </div>
    </AppCard>
  </form>
</template>
<script setup>
import AppCard from '@/components/general/AppCard.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import { useRouter } from 'vue-router';
defineProps({
  showGoBack: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['submit']);

const router = useRouter();

function onSubmit() {
  emit('submit');
}
function goBack() {
  router.back();
}
</script>
