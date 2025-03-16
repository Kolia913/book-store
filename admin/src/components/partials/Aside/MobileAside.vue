<template>
  <div>
    <transition name="fade">
      <div
        class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10"
        @click="toggleMobileAside"
        v-if="isMobileAsideOpen"
      ></div>
    </transition>
    <transition name="slide">
      <aside
        v-if="isMobileAsideOpen"
        class="fixed left-0 top-0 bottom-0 w-full bg-white dark:bg-grey-dark-100 menu z-20"
      >
        <header
          class="h-16 w-full bg-white dark:bg-grey-dark-100 flex justify-start items-center border-b px-8 dark:border-grey-dark-border"
        >
          <h1 class="text-lg font-bold leading-5">{{ title }}</h1>
          <div class="absolute top-6 right-4 cursor-pointer" @click="toggleMobileAside">
            <CloseIcon class="w-4 h-4" />
          </div>
        </header>
        <nav class="aside-scrollable">
          <ul class="pt-8 px-8 flex flex-col justify-start items-start gap-1">
            <li
              v-for="item in menuItems"
              :key="item.id"
              class="w-full cursor-pointer font-medium text-sm"
            >
              <MenuItem v-if="!item.isGroup" :item="item" :isActive="$route.path === item.link" />
              <div v-else class="flex flex-col justify-start items-center mt-4">
                <div
                  class="flex flex-row justify-between items-center p-2 w-full rounded-lg text-primary-300 bg-grey-100 dark:bg-grey-dark-50 dark:text-primary-dark-300"
                  @click="toggleMenuGroup(item.id)"
                >
                  <span>{{ item.title }}</span>
                  <ArrowIcon
                    class="w-3 h-3 duration-200"
                    :class="!item.isOpen ? 'rotate-180' : undefined"
                  />
                </div>
                <Dropdown :isOpen="item.isOpen" :items="item.subItems" />
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import MenuItem from './MenuItem.vue';
import Dropdown from './Dropdown.vue';

defineProps(['menuItems', 'title', 'isMobileAsideOpen']);

const emit = defineEmits(['toggleMenuGroup', 'toggleMobileAside']);

function toggleMenuGroup(groupId) {
  emit('toggleMenuGroup', groupId);
}

function toggleMobileAside() {
  emit('toggleMobileAside');
}
</script>
<style lang="scss" scoped>
.menu {
  max-width: 320px;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.2s;
}
.slide-enter-from {
  transform: translate(-320px, 0);
}
.slide-leave-to {
  transform: translate(-320px, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.aside-scrollable {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
