<template>
  <div
    v-if="pageData?.isActive"
    class="px-[50px] pt-[50px]"
    id="books"
  >
    <h4 class="app-text-h1 w-full mt-12 mb-[30px]">
      {{ pageData?.title?.value }}
    </h4>
    <div>
      <BookItem v-for="(item, idx) in books" :key="idx" :item="item" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  books: {
    required: true,
    type: Array,
  },
  pageData: {
    type: Object,
    required: true,
  },
});
const translationsStore = useTranslationsStore();
if(!props?.pageData?.isActive) {
    translationsStore.setHeaderLinkInactive("#books");
}
</script>
