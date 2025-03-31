<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#0000003f] z-100"
  >
    <div
      class="bg-white rounded-3.5xl w-[300px] h-fit p-4 gap-y-10 md:w-1/2 md:h-150 flex flex-col justify-center items-center md:gap-y-24"
    >
      <div class="text-center app-text-body">
        <p>Дякую!</p>
        <p>Ви успішно оформили замовлення!</p>
      </div>
      <IconsIconSuccess />
      <AtomsAppButton
        color="black"
        value="Повернутись до головної сторінки"
        @click="() => $router.push('/')"
      />
    </div>
  </div>
</template>
