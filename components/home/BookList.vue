<template>
  <div class="px-[50px] mb-[186px]">
    <h4 class="app-text-h1 w-full mb-[72px]">Книги</h4>
    <div>
      <BookItem v-for="(item, idx) in books" :key="idx" :item="item" />
    </div>
  </div>
</template>
<script setup>
const books = ref([
  {
    title: "про скепсис",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "/images/book1.png",
  },
  {
    title: "про розірвані ґердани",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "/images/book2.png",
  },
]);
</script>
