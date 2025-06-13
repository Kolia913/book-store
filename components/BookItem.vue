<template>
  <div
    class="flex flex-col md:flex-row md:gap-8 items-center md:items-start border-t border-black py-6 last:border-b"
  >
    <!-- Book Cover -->
    <div class="w-full md:w-1/2 flex justify-center">
      <img :src="item.images[0]" class="w-auto max-w-[300px] h-auto" />
    </div>

    <!-- Book Info -->
    <div
      class="w-full flex flex-col items-center md:items-end text-left md:text-right px-0 md:px-6 gap-7"
    >
      <div class="pt-6">
        <h3
          class="text-3xl md:text-4xl lg:text-6xl font-semibold italic uppercase"
        >
          {{ item.title }}
        </h3>
        <div
          class="text-gray-600 app-text-body mt-2 line-clamp-8 md:line-clamp-4 lg:line-clamp-5" v-html="item.description"
        >
   
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 flex-wrap justify-center">
        <AtomsAppOutlinedButton
          value="Більше"
          color="black"
          @click="$router.push(`/book/${item.id}`)"
          class="w-full sm:w-auto"
        />
        <AtomsAppOutlinedButton
          value="Купити"
          color="filled"
          class="w-full sm:w-auto"
          @click="addToCart(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
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
