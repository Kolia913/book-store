<template>
  <div class="relative w-full h-fit">
    <img
      :src="translations?.content?.banner?.image?.value"
      class="w-full h-auto object-cover"
    />
    <div
      class="absolute flex flex-col sm:flex-row-reverse justify-center items-center gap-4 text-white bottom-4 w-[250px] sm:w-[320px] md:w-[460px] px-4 sm:px-6 md:px-8 lg:bottom-6 lg:w-[760px] lg:mb-8"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase text-center sm:text-right mb-0 lg:mb-10 xl:mb-24"
      >
        {{ translations?.content?.banner?.title?.value }}
      </h1>
    </div>
  </div>
</template>
<script setup>
defineProps({
  translations: {
    type: Object,
    required: true,
  },
});
</script>
