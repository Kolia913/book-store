<template>
  <div>
    <transition name="fade">
      <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30"
        @click="closeNotifications"
        v-if="isNotificationsOpen"
      ></div>
    </transition>
    <transition name="slide">
      <div
        v-if="isNotificationsOpen"
        class="fixed right-0 top-0 bottom-0 w-full bg-white dark:bg-grey-dark-100 max-w-md z-40 pt-7"
      >
        <div class="absolute top-7 right-7 cursor-pointer" @click="closeNotifications">
          <CloseIcon class="w-5 h-5" />
        </div>
        <EmptyList />
      </div>
    </transition>
  </div>
</template>
<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import EmptyList from './EmptyList.vue';

defineProps(['isNotificationsOpen']);

const emit = defineEmits(['onClose']);

function closeNotifications() {
  emit('onClose');
}
</script>
<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.2s;
}
.slide-enter-from {
  transform: translate(448px, 0);
}
.slide-leave-to {
  transform: translate(448px, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
