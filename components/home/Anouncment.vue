<template>
  <div class="py-[138px] flex justify-center">
    <!-- Main Container -->
    <div
      class="w-full rounded-3.5xl bg-primary-red p-[50px] flex gap-[180px] pt-[100px] pb-[200px]"
    >
      <!-- Left Block (Image Centered) -->
      <div class="w-1/2 flex justify-center items-center">
        <img src="/images/announcment.png" class="w-auto h-auto" />
      </div>

      <!-- Right Block (Text Right-Aligned) -->
      <div
        class="w-1/2 flex flex-col justify-between items-end text-white text-right"
      >
        <h3 class="text-6xl font-[500] mb-[50px]">Анонс нової книги</h3>
        <p class="text-3xl leading-relaxed mt-4 mb-[136px]">
          “Книга «Скепсис» – фронтова повість, заснована на подіях 2014-2015
          років. Я писав її, вражений дрімучою «совковістю», з котрою
          зіштовхнувся повз 12 років від звільнення з армії.”
        </p>

        <!-- Button (Right-Aligned) -->
        <AtomsAppOutlinedButton value="Більше" color="white" class="mt-6" />
      </div>
    </div>
  </div>
</template>
