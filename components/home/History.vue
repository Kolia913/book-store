<template>
  <div
    v-if="pageData?.isActive"
    class="flex justify-start flex-col-reverse lg:flex-row items-stretch gap-12 lg:gap-0 pt-[50px] mb-[150px] xl:pt-[138px]"
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
        <div
          class="text-wrap app-text-body font-normal px-0! ql-editor"
          style="text-align: justify"
          v-html="pageData?.description?.value"
        >
        
        </div>
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
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  pageData: {
    type: Object,
    required: true,
  },
});
const translationsStore = useTranslationsStore();
if(!props?.pageData?.isActive) {
    translationsStore.setHeaderLinkInactive("#story");
}
</script>
<style scoped>
@media (min-width: 1024px) {
  .app-text-body {
    font-size: 1.7vw !important;
  }
}
</style>
