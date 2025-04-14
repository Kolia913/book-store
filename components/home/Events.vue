<template>
    <div
      class="px-[50px] py-[50px] "
      id="events"
    >
      <h4 class="app-text-h1 w-full mt-12 mb-[30px]">
       Події
      </h4>
      <div>
        <EventItem v-for="(item, idx) in events" :key="idx" :item="item" />
      </div>
    </div>
  </template>
  <script setup>
defineProps({
  events: {
    required: true,
    type: Array,
  },
});
  </script>
  