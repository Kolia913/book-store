<template>
  <div class="cart-wrapper">
    <div
      @click="$emit('close')"
      class="fixed inset-0 bg-[#00000054] w-[100vw] h-[100vh] z-[100]"
    ></div>
    <Transition name="slide-fade">
      <div
        class="fixed right-0 bottom-0 lg:top-0 h-[600px] lg:h-[100vh] bg-white w-full lg:w-[700px] z-[1000]"
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
          <p>1 шт.</p>
          <div>видалити все</div>
        </div>
        <CartItem />
      </div>
    </Transition>
  </div>
</template>

<script setup>
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
</style>
