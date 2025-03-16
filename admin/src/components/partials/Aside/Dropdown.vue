<template>
  <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <ul
      v-if="items?.length && isOpen"
      class="flex flex-col justify-start items-start gap-1 w-full overflow-hidden duration-200 transition-all ease-in-out origin-top cursor-default pl-4 pt-2"
    >
      <li v-for="subItem of items" :key="subItem.id" class="w-full cursor-pointer">
        <MenuItem :item="subItem" :isActive="$route.path.startsWith(subItem.link)" />
      </li>
    </ul>
  </transition>
</template>
<script setup>
import MenuItem from './MenuItem.vue';
import useExpandAnimation from '@/composables/useExpandAnimation';

defineProps(['items', 'isOpen']);

const { enter, afterEnter, leave } = useExpandAnimation();
</script>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}
</style>
