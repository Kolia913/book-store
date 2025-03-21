<template>
  <PartialsHeader />
  <slot />
  <PartialsFooter />
</template>
<script setup>
const translationsPromise = useAsyncData("translationsData", () => {
  return translationsStore.fetchTranslations();
});

const pagesPromise = useAsyncData("pages", () => {
  return pagesStore.fetchPages();
});

await Promise.all([translationsPromise, pagesPromise]);
</script>
