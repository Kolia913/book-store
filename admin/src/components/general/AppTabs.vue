<template>
  <div
    class="flex bg-white dark:bg-gray-700 font-bold gap-1 mb-4"
    :class="isVertical && 'flex-col'"
  >
    <template v-for="tab in props.tabs" :key="`tab_${tab.id}`">
      <div
        class="px-10 py-3 mx-1 cursor-pointer text-center rounded-md text-sm"
        :class="tab.id === props.activeTab ? 'bg-gray-200 text-gray-900' : 'bg-gray-100 text-gray-400 lg:hover:text-gray-900 lg:transition'"
        @click="$emit('changeActiveTab', tab.id)"
      >
        {{ tab.title }}
      </div>
    </template>
  </div>
</template>
<script setup>
const props = defineProps({
  tabs: {
    default: [
      {
        id: 'default',
        name: 'Default',
      },
    ],
  },
  isVertical: {
    type: Boolean,
    default: false
  },
  activeTab: {
    type: String || Number,
    default: 'default',
  },
});
</script>
