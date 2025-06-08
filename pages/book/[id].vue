<template>
  <div
    class="py-[38px] px-4 pt-25 lg:px-12 lg:pt-50 xl:pt-42 2xl:pt-60 flex flex-col 2xl:flex-row xl:gap-8 justify-between xl:items-center"
    :class="{
      'lg:py-50 xl:py-42 2xl:py-60':
        !bookData.is_feedback_shown,
    }"
  >
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <div
        class="flex flex-col-reverse xl:flex-row justify-center items-center gap-5 w-full max-w-[450px] lg:w-[450px] lg:h-fit z-0"
      >
        <div class="flex flex-col gap-4 items-center">
          <div
  class="relative cursor-pointer flex xl:flex-col gap-3"
  v-if="bookData.images.length > 1"
>
  <img
    v-for="(image, index) in bookData.images.slice(0, 4)"
    :key="index"
    :src="image"
      @click="openGalleryModal(index)"

    class="xl:max-w-[100px] max-h-[100px] rounded"
  />
  <div
    v-if="bookData.images.length > 4"
    class="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded"
  >
    +{{ bookData.images.length - 4 }}
  </div>
</div>

        </div>

        <div class="relative w-full max-w-[400px]">
          <img
            :src="bookData.images[currentImageIndex]"
            class="w-full h-full rounded"
          />
          <button
            v-if="currentImageIndex > 0"
            @click="prevImage"
            class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1"
          >
            ‹
          </button>
          <button
            v-if="currentImageIndex < bookData.images.length - 1"
            @click="nextImage"
            class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1"
          >
            ›
          </button>
        </div>
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
      <!-- <div class="text-4xl my-[20px] xl:mt-0 xl:text-3xl 2xl:text-4xl italic">
        {{ bookData.author }} <br />
        <span class="uppercase">{{ bookData.title }}</span>
      </div> -->

      <div
        class="flex w-full flex-col md:flex-row 2xl:flex-col gap-8 xl:gap-10 2xl:gap-4"
      >
        <div class="w-full xl:w-[420px] 2xl:w-[380px] self-end">
          <div class="flex items-center justify-between pb-2">
            <span v-if="bookData.is_available" class="text-lg italic"
              >в наявності</span
            >
            <span v-else class="text-lg italic text-primary-red"
              >немає в наявності</span
            >
            <span
              v-if="bookData.discount_price && bookData.is_on_sale"
              class="text-2xl"
            >
              {{ bookData.discount_price }} ₴
              <span class="text-xl line-through text-[#7E827D] pl-2"
                >{{ bookData.price }} ₴</span
              >
            </span>
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
            <span
              v-if="
                bookData.discount_price_with_signature && bookData.is_on_sale
              "
              class="text-2xl"
            >
              {{ bookData.discount_price_with_signature }} ₴
              <span class="text-xl line-through text-[#7E827D] pl-2"
                >{{ bookData.price_with_signature }} ₴</span
              >
            </span>
            <span v-else class="text-2xl"
              >{{ bookData.price_with_signature }} ₴</span
            >
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
    
    <div
      v-if="showFeedbackGallery"
      class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000000d5] z-100 px-2"
    >
      <button
        @click="showFeedbackGallery = false"
        class="absolute top-6 right-6 text-white text-3xl font-bold cursor-pointer z-150"
      >
        ✕
      </button>

      <div
        class="flex flex-col sm:flex-row items-center justify-center sm:gap-8 gap-4 w-full max-w-[95vw]"
      >
        <div class="cursor-pointer hidden sm:block" @click="prevFeedbackGalleryImage">
          <img
            :src="bookData.feedback_images[getWrappedFeedIndex(currentFeedbackGalleryIndex-1)]"
            class="w-24 h-auto rounded opacity-70 hover:opacity-100 transition"
            alt="Previous image"
          />
        </div>

        <img
          :src="bookData.feedback_images[currentFeedbackGalleryIndex]"
          class="w-full max-w-[90vw] sm:w-[700px] h-auto rounded shadow-lg border-4 border-white"
          alt="Current image"
        />

        <div class="cursor-pointer hidden sm:block" @click="nextFeedbackGalleryImage">
          <img
            :src="bookData.feedback_images[getWrappedFeedIndex(currentFeedbackGalleryIndex+1)]"
            class="w-24 h-auto rounded opacity-70 hover:opacity-100 transition"
            alt="Next image"
          />
        </div>
      </div>

      <div
        class="flex sm:hidden justify-between w-full px-4 absolute bottom-10"
      >
        <button
          @click="prevFeedbackGalleryImage"
          class="text-white text-3xl px-3 py-1 bg-black/50 rounded"
        >
          ‹
        </button>
        <button
          @click="nextFeedbackGalleryImage"
          class="text-white text-3xl px-3 py-1 bg-black/50 rounded"
        >
          ›
        </button>
      </div>
    </div>
  </div>
  <div class="w-screen">
<div
      v-if="bookData?.feedback_images && bookData?.is_feedback_shown"
      class="w-[95%] xl:w-[80%] m-[auto] md:my-12 flex flex-col gap-8"
    >
      <div class="text-2xl">Відгуки</div>
      <div class="relative flex">
        <button
          @click="prevFeedbackImage"
          class="absolute top-[105%] hidden xl:flex left-0 xl:top-1/2 xl:-left-10 z-10 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1"
        >
          ‹
        </button>
        <div class="pb-4 flex gap-4 overflow-x-auto scroll-smooth feedcont">
          <div
            v-for="(image, index) in bookData?.feedback_images"
            :key="index"
            class="min-w-[300px] sm:min-w-[600px] flex items-center justify-center h-full border rounded"
            style="background: white"
            @click="showFeedbackGallery = true"
          >
            <img
              :src="image"
              class="max-h-[500px] w-auto rounded object-contain"
            />
          </div>
        </div>
        <button
          @click="nextFeedbackImage"
          class="absolute top-[105%] hidden xl:flex right-0 xl:top-1/2 xl:-right-10 z-10 transform -translate-y-1/2 bg-black/50 text-white px-2 py-1"
        >
          ›
        </button>
      </div>
      </div>
    </div>
  <div
    v-if="showGallery"
    class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#000000d5] z-100 px-2"
  >
    <button
      @click="showGallery = false"
      class="absolute top-6 right-6 text-white text-3xl font-bold cursor-pointer z-150"
    >
      ✕
    </button>

    <div
      class="flex flex-col sm:flex-row items-center justify-center sm:gap-8 gap-4 w-full max-w-[95vw]"
    >
      <div class="cursor-pointer hidden sm:block" @click="prevGalleryImage">
        <img
          :src="bookData.images[getWrappedIndex(currentGalleryIndex - 1)]"
          class="w-24 h-auto rounded opacity-70 hover:opacity-100 transition"
          alt="Previous image"
        />
      </div>

      <img
        :src="bookData.images[currentGalleryIndex]"
        class="w-full max-w-[90vw] sm:w-[500px] h-auto rounded shadow-lg border-4 border-white"
        alt="Current image"
      />

      <div class="cursor-pointer hidden sm:block" @click="nextGalleryImage">
        <img
          :src="bookData.images[getWrappedIndex(currentGalleryIndex + 1)]"
          class="w-24 h-auto rounded opacity-70 hover:opacity-100 transition"
          alt="Next image"
        />
      </div>
    </div>

    <div class="flex sm:hidden justify-between w-full px-4 absolute bottom-10">
      <button
        @click="prevGalleryImage"
        class="text-white text-3xl px-3 py-1 bg-black/50 rounded"
      >
        ‹
      </button>
      <button
        @click="nextGalleryImage"
        class="text-white text-3xl px-3 py-1 bg-black/50 rounded"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const route = useRoute();
const cartStore = useCartStore();
const bookStore = useBooksStore();

const bookId = route.params.id;

const { data: bookData } = await useAsyncData(`bookData${bookId}`, () => {
  return bookStore.fetchBookById(bookId);
});

const { $toast } = useNuxtApp();

const currentImageIndex = ref(0);
const showGallery = ref(false);
const showFeedbackGallery = ref(false);

const currentGalleryIndex = ref(0);
const currentFeedbackGalleryIndex = ref(0);

const nextFeedbackImage = () => {
  const feedbackContainer = document.querySelector(".feedcont");
  if (feedbackContainer) {
    feedbackContainer.scrollBy({ left: 500, behavior: "smooth" });
  }
};

const prevFeedbackImage = () => {
  const feedbackContainer = document.querySelector(".feedcont");
  if (feedbackContainer) {
    feedbackContainer.scrollBy({ left: -500, behavior: "smooth" });
  }
};

const nextGalleryImage = () => {
  currentGalleryIndex.value = getWrappedIndex(currentGalleryIndex.value + 1);
};

const prevGalleryImage = () => {
  currentGalleryIndex.value = getWrappedIndex(currentGalleryIndex.value - 1);
};

const nextFeedbackGalleryImage = () => {
  currentFeedbackGalleryIndex.value = getWrappedFeedIndex(currentFeedbackGalleryIndex.value + 1);
};
const prevFeedbackGalleryImage = () => {
  currentFeedbackGalleryIndex.value = getWrappedFeedIndex(currentFeedbackGalleryIndex.value - 1);
};

const getWrappedIndex = (index) => {
  const total = bookData.value.images.length;
  return (index + total) % total;
};
const getWrappedFeedIndex = (index) => {
  const total = bookData.value.feedback_images.length;
  return (index + total) % total;
};

const nextImage = () => {
  if (currentImageIndex.value < bookData.value.images.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const openGalleryModal = (startIndex) => {
  showGallery.value = true;
  currentGalleryIndex.value = startIndex !== undefined ? startIndex : 0;
};

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
