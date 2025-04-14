<template>
  <HomeBanner :pageData="pages.content.banner" />
  <HomeBookList :books="books" :pageData="pages.content.books" />
  <HomeAnouncment :data="translations" :pageData="pages.content.announcement" />
  <HomeDiscount
    :data="translations"
    :pageData="pages.content.sale"
    :books="saleBooks"
  />
  <HomeHistory :data="translations" :pageData="pages.content.history" />
  <HomeEvents :events="events"/>
</template>

<script setup>
const booksStore = useBooksStore();
const pageStore = usePageStore();
const eventsStore = useEventsStore();
const { data: translations } = useNuxtData("translationsData");
const { data: books } = useNuxtData("booksData");
const { data: pages } = useNuxtData("pagesData");
const { data: events } = useNuxtData("eventsData");

const saleBooks = computed(() => {
  return books.value?.filter((book) => book.is_on_sale) || [];
});

const booksPromise = useAsyncData("booksData", () => {
  return booksStore.fetchBooks();
});

const pagePromise = useAsyncData("pagesData", () => {
  return pageStore.fetchPageByKey("home");
});

const eventsPromise = useAsyncData("eventsData", () => {
  return eventsStore.fetchEvents();
});

await Promise.all([booksPromise, pagePromise, eventsPromise]);
</script>
