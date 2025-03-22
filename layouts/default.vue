<template>
  <PartialsHeader />
  <slot />
  <PartialsFooter />
</template>
<script setup>
const translationsStore = useTranslationsStore();

const translationsPromise = useAsyncData("translationsData", () => {
  return translationsStore.fetchTranslations();
});

await Promise.all([translationsPromise]);
</script>
