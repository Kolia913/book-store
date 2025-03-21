<template>

  <div class="flex justify-between h-fit items-start p-4">
    <div class="flex flex-row items-start gap-4">
      <img :src="item.image" alt="Book cover" class="w-40" />
      <div>
        <div class="app-text-body uppercase italic xl:mr-2">
          {{ item.title }}
        </div>
        <div class="text-[#ABE19D]">{{ translation.available }}</div>
        <div
          class="mt-1 sm:mt-4 flex justify-between border rounded-xl w-[100px] p-2"
        >
          <IconsIconMinus
            class="w-5"
            :class="{
              'opacity-50 cursor-not-allowed': item.quantity === 1,
              'cursor-pointer': item.quantity > 1,
            }"
            @click="item.quantity > 1 ? cartStore.removeItem(item.id) : null"
          />
          <div>{{ item.quantity }}</div>
          <IconsIconPlus
            class="cursor-pointer w-5"
            @click="cartStore.addItem(item.id)"
          />
        </div>
        <div class="app-text-body mt-4">{{ item.cost }} ₴</div>
      </div>
    </div>

    <button
      class="text-primary-red cursor-pointer"
      @click="removeBook(item.id)"
    >
      <IconsIconDelete class="w-8" />
      <!-- {{ data.delete }} -->
    </button>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  translation: {
    type: Object,
    required: true,
  },
});
const cartStore = useCartStore();
const { $toast } = useNuxtApp();

const removeBook = (id) => {
  try {
    cartStore.removeFromCart(id);
    $toast.success("Книгу видалено з корзини! 😫", {
      autoClose: 1000,
    });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    $toast.error("Не вдалося видалити з корзини.");
  }
};
</script>
