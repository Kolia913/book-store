<template>
  <HistoryExtBanner :translations="pages" />
  <HistoryExtInterviewText :translations="pages" />
</template>

<script setup>
const pagesStore = usePageStore();

const { data: pages } = await useAsyncData("pagesData", () => {
  return pagesStore.fetchPageByKey("extended-history");
});
</script>
