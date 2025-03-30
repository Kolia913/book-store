<template>
  <HomeBanner :pageData="pages.content.banner" />
  <HomeHistory :data="translations" :pageData="pages.content.history" />
  <HomeAnouncment :data="translations" :pageData="pages.content.announcement" />
  <HomeDiscount :data="translations" :pageData="pages.content.sale" />
  <HomeBookList :books="books" :pageData="pages.content.books" />
</template>

<script setup>
const booksStore = useBooksStore();
const pageStore = usePageStore();

const { data: translations } = useNuxtData("translationsData");
const { data: books } = useNuxtData("booksData");
const { data: pages } = useNuxtData("pagesData");

const booksPromise = useAsyncData("booksData", () => {
  return booksStore.fetchBooks();
});

const pagePromise = useAsyncData("pagesData", () => {
  return pageStore.fetchPageByKey("home");
});

await Promise.all([booksPromise, pagePromise]);
</script>
