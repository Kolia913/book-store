<template>
  <div
    class="flex flex-col items-center px-4 lg:px-12 xl:px-40 pt-[50px] xl:pt-[138px] relative overflow-hidden"
    id="sale"
    v-if="pageData?.isActive"
  >
    <IconsIconLightning2
      class="absolute right-[-570px] bottom-[80px] lg:right-[-270px] lg:bottom-[-280px]"
    />
    <IconsIconLightning3
      class="absolute left-[-320px] bottom-[310px] lg:left-[-220px] md:bottom-[-10px]"
    />
    <div class="app-text-h1 text-center z-2">
      {{ pageData?.titlePart1.value }}
      <span class="text-primary-red"
        >- {{ pageData?.discountPrecent.value }}%</span
      >
      {{ pageData?.titlePart2.value }}
    </div>
    <div
      class="grid grid-cols-1 place-items-center gap-10 w-full my-18 z-2"
      :class="{
        'lg:grid-cols-1': (books.length = 1),
        'md:grid-cols-2 lg:grid-cols-2': (books.length = 2),
        'md:grid-cols-2 lg:grid-cols-3': (books.length = 3),
        'md:grid-cols-2 lg:grid-cols-4': books.length >= 4,
      }"
    >
      <div
        v-for="book in books"
        :key="book.id"
        class="flex flex-col items-center gap-4"
      >
        <img :src="book.image" />
        <div class="text-4xl uppercase text-center">{{ book.title }}</div>
        <div class="flex items-end gap-4">
          <div class="app-text-price">{{ book.discount_price }}₴</div>
          <div class="text-2xl line-through text-[#7E827D]">
            {{ book.price }}$
          </div>
        </div>
      </div>
    </div>

    <AtomsAppButton
      :value="data.button_buy"
      color="black"
      class="px-24 uppercase"
    />
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
  pageData: {
    type: Object,
    required: true,
  },
  books: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
