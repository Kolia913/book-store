<template>
  <div class="px-[50px] mb-[186px] pt-[50px] xl:pt-[138px]" id="books">
    <h4 class="app-text-h1 w-full mt-12 mb-[30px]">
      {{ pageData?.title?.value }}
    </h4>
    <div>
      <BookItem v-for="(item, idx) in books" :key="idx" :item="item" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  books: {
    required: true,
    type: Array,
  },
  pageData: {
    type: Object,
    required: true,
  },
});
</script>
