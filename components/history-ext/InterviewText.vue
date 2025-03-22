<template>
  <div class="px-4 sm:px-8 md:px-16 lg:px-42 mx-auto overflow-hidden">
    <div class="app-text-h1 pt-8 sm:pt-12 lg:pt-20">
      {{ translations?.content?.interview?.title?.value }}
    </div>
    <article
      class="app-text-body py-8 sm:py-12 relative"
      style="text-align: justify"
    >
      <IconsIconLightning1
        class="absolute right-[-90px] rotate-180 md:rotate-0 md:left-[-220px] top-[-50px] md:top-[-90px]"
      />
      {{ translations?.content?.interview?.content?.value }}
      <IconsIconLightning2 class="absolute right-[-590px] bottom-[-80px]" />
      <IconsIconLightning3 class="absolute left-[-480px] bottom-[-80px]" />
    </article>
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
