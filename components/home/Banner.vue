<template>
  <div
    v-if="pageData?.isActive"
    class="relative w-full h-fit pt-20 lg:pt-38"
    id="hero"
  >
    <img :src="pageData?.image?.value" class="w-full h-auto object-cover" />
    <div
      class="absolute flex flex-row-reverse justify-center gap-3.5 text-white bottom-1 md:bottom-6 w-full -ml-[50px]"
    >
      <h1 class="app-text-h1 text-wrap w-[150px]">
        {{ pageData?.authorName?.value }}
      </h1>
      <span class="text-md md:text-xl lg:text-3xl">
        {{ pageData?.author?.value }}</span
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  pageData: {
    type: Object,
    required: true,
  },
});
</script>
