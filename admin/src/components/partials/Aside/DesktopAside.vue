<template>
  <aside class="fixed left-0 top-0 bottom-0 w-full bg-grey-bg menu dark:bg-grey-dark-bg z-20">
    <header
      class="h-16 w-full bg-white flex justify-start items-center border-b px-8 dark:bg-grey-dark-100 dark:border-grey-dark-border"
    >
      <h1 class="text-xl font-bold whitespace-nowrap">{{ title }}</h1>
    </header>
    <nav class="pl-8 pr-4 aside-scrollable">
      <ul class="pt-8 flex flex-col justify-start items-start gap-1">
        <li
          v-for="item in menuItems"
          :key="item.id"
          class="w-full cursor-pointer font-medium text-sm"
        >
          <MenuItem v-if="!item.isGroup" :item="item" :isActive="$route.path === item.link" />
          <div v-else class="flex flex-col justify-start items-center mt-1 mb-1">
            <div
              class="flex flex-row justify-between items-center p-2 w-full rounded-lg text-primary-300 bg-grey-100 dark:bg-grey-dark-50 dark:text-primary-dark-300"
              @click="toggleMenuGroup(item.id)"
            >
              <div class="flex justify-start gap-2">
                <div class="w-5 h-5">
                  <FolderActiveIcon v-if="item.isOpen" :color="'#d97707'" />
                  <FolderIcon v-else :color="'#d97707'" />
                </div>
                <span>{{ item.title }}</span>
              </div>
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
</template>

<script setup>
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import FolderActiveIcon from '@/components/icons/folders/FolderActiveIcon.vue';
import FolderIcon from '@/components/icons/folders/FolderIcon.vue';
import MenuItem from './MenuItem.vue';
import Dropdown from './Dropdown.vue';

defineProps(['menuItems', 'title']);

const emit = defineEmits(['toggleMenuGroup']);

function toggleMenuGroup(groupdId) {
  emit('toggleMenuGroup', groupdId);
}
</script>
<style lang="scss" scoped>
.menu {
  max-width: 340px;
  @media screen and (max-width: 1280px) {
    max-width: 280px;
  }
}
.aside-scrollable {
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
