<template>
  <HomeBanner />
  <HomeHistory :data="translations" />
  <HomeAnouncment :data="translations" />
  <HomeDiscount :data="translations" />
  <HomeBookList :books="books" />
</template>

<script setup>
const booksStore = useBooksStore();
const { data: translations } = useNuxtData("translationsData");
const { data: books } = await useAsyncData("booksData", () => {
  return booksStore.fetchBooks();
});
</script>
