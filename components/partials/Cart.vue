<template>
  <div class="cart-wrapper">
    <div
      @click="$emit('close')"
      class="fixed inset-0 bg-[#00000054] w-[100vw] h-[100vh] z-[100]"
    ></div>
    <Transition name="slide-fade">
      <div
        class="fixed right-0 bottom-0 lg:top-0 h-fit lg:h-[100vh] bg-white w-full lg:w-[700px] z-[1000]"
      >
        <div
          class="flex justify-between items-center p-4 border-b border-[#D9D9D9]"
        >
          <p class="text-xl lg:text-2xl">Кошик</p>
          <IconsIconCross
            width="30px"
            class="cursor-pointer"
            @click="$emit('close')"
          />
        </div>
        <div
          class="flex justify-between items-center p-4 border-b border-[#D9D9D9]"
        >
          <p>
            {{ formattedCart.length }} {{ cartTranslations.quantity_postfix }}
          </p>
          <div
            v-if="formattedCart.length > 0"
            class="cursor-pointer"
            @click="deleteAllBooks"
          >
            {{ cartTranslations.cart_delete_all }}
          </div>
        </div>
        <div
          class="flex flex-col justify-between h-full max-h-[calc(100vh-116px)] overflow-auto"
        >
          <div class="flex flex-col justify-start items-center w-full">
            <CartItem
              v-for="item in formattedCart"
              :key="item.id"
              class="w-full"
              :item="item"
              :translation="cartItemTranslations"
            />
          </div>
          <div class="invisible lg:visible pb-4 bg-white bottom-0 w-full">
            <div class="app-text-body p-4">Загалом: {{ total }} ₴</div>
            <div class="w-full h-fit px-4 pb-4">
              <AtomsAppButton
                color="black"
                :value="cartTranslations.cart_checkout"
                class="w-full"
              />
            </div>
          </div>
          <div class="lg:hidden pb-4 bg-white fixed bottom-0 w-full shadow">
            <div class="app-text-body p-4">Загалом: {{ total }} ₴</div>
            <div class="w-full h-fit px-4 pb-4">
              <AtomsAppButton
                color="black"
                :value="cartTranslations.cart_checkout"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const translationsStore = useTranslationsStore();
const cartTranslations = computed(() => translationsStore.getOtherTranslations);
const cartStore = useCartStore();
const formattedCart = computed(() => cartStore.formattedCart);

const total = computed(() => cartStore.total);

const cartItemTranslations = computed(() => ({
  available: cartTranslations.value?.available,
  not_available: cartTranslations.value?.not_available,
  delete: cartTranslations.value?.cart_delete,
}));
const { $toast } = useNuxtApp();

const deleteAllBooks = () => {
  try {
    cartStore.clearCart();
    $toast.success("Корзина очищена!");
  } catch (error) {
    console.error("Error clearing the cart:", error);
    $toast.error("Не вдалося очистити корзину.");
  }
};

defineEmits(["close"]);
</script>

<style scoped>
.cart-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 9999;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active .right-0,
.slide-fade-leave-active .right-0 {
  transition: transform 0.3s ease-out;
}

.slide-fade-enter-from .right-0,
.slide-fade-leave-to .right-0 {
  transform: translateY(100%);
}

@media screen and (min-width: 1024px) {
  .slide-fade-enter-from .right-0,
  .slide-fade-leave-to .right-0 {
    transform: translateX(100%);
  }
}
.shadow {
  box-shadow: 0px -20px 20px 0px #f3f3f5;
}
</style>
