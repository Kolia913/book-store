<template>
    <div
      v-if="pageData?.isActive"
      class="px-[50px] py-[50px] "
      id="events"
    >
      <h4 class="app-text-h1 w-full mt-12 mb-[30px]">
        {{ pageData?.title?.value }}
      </h4>
      <div>
        <EventItem v-for="(item, idx) in events" :key="idx" :item="item" />
      </div>
    </div>
  </template>
  <script setup>
const props = defineProps({
  events: {
    required: true,
    type: Array,
  },
  pageData: {
    required: true,
    type: Object,
  },
});
const translationsStore = useTranslationsStore();
if(!props?.pageData?.isActive) {
    translationsStore.setHeaderLinkInactive("#events");
}
</script>
  