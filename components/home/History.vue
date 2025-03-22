<template>
  <div
    v-if="pageData?.isActive"
    class="flex justify-start flex-col-reverse lg:flex-row items-stretch gap-12 lg:gap-0 pt-[50px] xl:pt-[138px]"
    id="story"
  >
    <div class="flex-1">
      <img :src="pageData?.image?.value" class="w-auto h-auto object-fit" />
    </div>

    <div class="flex flex-col justify-between px-[32px] flex-1 min-h-[100%]">
      <div>
        <h2
          class="app-text-h1 pb-[10px] sm:pb-[20px] lg:pb-[10px] xl:pb-[30px]"
        >
          {{ pageData?.title?.value }}
        </h2>
        <p
          class="text-wrap app-text-body font-normal"
          style="text-align: justify"
        >
          {{ pageData?.description?.value }}
        </p>
      </div>

      <AtomsAppOutlinedButton
        :value="data.button_more"
        color="black"
        class="mt-8"
        @click="$router.push('/extended-history')"
      />
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
  pageData: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
@media (min-width: 1024px) {
  .app-text-body {
    font-size: 1.7vw !important;
  }
}
</style>
