<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#0000003f] z-100"
  >
    <div
      class="bg-white rounded-3.5xl w-1/2 h-150 flex flex-col justify-center items-center gap-y-24"
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
