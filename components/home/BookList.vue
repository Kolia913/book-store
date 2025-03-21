<template>
  <div class="px-[50px] mb-[186px] pt-[50px] xl:pt-[138px]" id="books">
    <h4 class="app-text-h1 w-full mt-12 mb-[30px]">Книги</h4>
    <div>
      <BookItem v-for="(item, idx) in booksData" :key="idx" :item="item" />
    </div>
  </div>
</template>
<script setup>
const booksStore = useBooksStore();

const { data: booksData } = await useAsyncData("booksData", () => {
  return booksStore.fetchBooks();
});
</script>
