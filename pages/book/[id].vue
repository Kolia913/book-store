<template>
  <div
    class="py-[38px] px-4 pt-25 lg:px-12 lg:py-50 xl:py-42 2xl:py-60 flex flex-col 2xl:flex-row xl:gap-8 justify-between xl:items-center "
  >
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <div
        class="flex flex-col-reverse xl:flex-row justify-center items-center gap-5 w-full max-w-[450px] lg:w-[450px] lg:h-fit z-0"
      >
        <div
          class="flex flex-row xl:flex-col h-full justify-center gap-9 lg:gap-4 xl:gap-8"
        >
          <div v-for="img in bookData.images" :key="img">
            <img
              :src="img"
              class="cursor-pointer xl:max-w-[100px] max-h-[100px]"
            />
          </div>
        </div>
        <img :src="bookData.images[0]" class="w-full max-w-[400px] h-full" />
      </div>
      <div class="w-full xl:w-[600px] 2xl:w-[550px] self-start xl:self-center">
        <div class="app-text-h1 mb-[20px] italic">
          {{ bookData.page_desc_caption }}
        </div>
        <p class="app-text-small leading-relaxed mt-4 mb-12 lg:mb-0">
          {{ bookData.description }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col justify-between text-black text-left 2xl:items-end 2xl:text-right z-20 mt-8 xl:mt-10 2xl:mt-0"
    >
      <div class="text-4xl my-[20px] xl:mt-0 xl:text-3xl 2xl:text-4xl italic">
        {{ bookData.author }} <br />
        <span class="uppercase">{{ bookData.title }}</span>
      </div>

      <div class="flex w-full flex-col md:flex-row 2xl:flex-col gap-8 xl:gap-10 2xl:gap-4">
        <div class="w-full xl:w-[420px] 2xl:w-[380px] self-end">
          <div class="flex items-center justify-between pb-2">
            <span v-if="bookData.is_available" class="text-lg italic"
              >в наявності</span
            >
            <span v-else class="text-lg italic text-primary-red"
              >немає в наявності</span
            >
            <span v-if="bookData.discount_price" class="text-2xl"> {{ bookData.discount_price }} ₴ <span class="text-xl line-through text-[#7E827D] pl-2">{{ bookData.price }} ₴</span> </span>
            <span v-else class="text-2xl">{{ bookData.price }} ₴</span>
           
          </div>
          <AtomsAppOutlinedButton
            value="купити"
            color="black"
            class="text-lg w-full uppercase"
            :class="{
              'opacity-30 pointer-events-none': !bookData.is_available,
            }"
            @click="addToCart(bookData.id)"
          />
        </div>
        <div class="w-full xl:w-[420px] 2xl:w-[380px] self-end">
          <div class="flex items-center justify-between pb-2">
            <span v-if="bookData.is_available" class="text-lg italic"
              >в наявності</span
            >
            <span v-else class="text-lg italic text-primary-red"
              >немає в наявності</span
            >
            <span v-if="bookData.discount_price_with_signature" class="text-2xl"> {{ bookData.discount_price_with_signature }} ₴ <span class="text-xl line-through text-[#7E827D] pl-2">{{ bookData.price_with_signature }} ₴</span> </span>
            <span v-else class="text-2xl">{{ bookData.price_with_signature }} ₴</span>
          </div>
          <NuxtLink
            to="https://t.me/grigoryobertailo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AtomsAppOutlinedButton
              value="купити з підписом автора"
              color="filled"
              class="text-lg w-full uppercase"
              :class="{
              'opacity-30 pointer-events-none': !bookData.is_available,
            }"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const cartStore = useCartStore();
const bookStore = useBooksStore();

const bookId = route.params.id;

const { data: bookData } = await useAsyncData(`bookData${bookId}`, () => {
  return bookStore.fetchBookById(bookId);
});
const { $toast } = useNuxtApp();

const addToCart = (productId) => {
  try {
    cartStore.addItem(productId);
    $toast.success("Додано до корзини! 😁", {
      autoClose: 1000,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    $toast.error("Не вдалося додати до корзини.");
  }
};
</script>
