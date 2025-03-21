<template>
  <div
    v-if="adminDavDobro"
    class="pt-[50px] xl:pt-[138px] mt-12 lg:mt-24 flex justify-center"
    id="anons"
  >
    <!-- Main Container -->
    <div
      class="w-full rounded-3.5xl bg-primary-red p-[40px] sm:p-[50px] flex justify-center items-center gap-[50px] lg:gap-[110px] lg:py-[50px] xl:py-[100px] relative"
    >
      <div
        class="absolute block lg:hidden bg-[#00000098] m-[50px] rounded-3.5xl w-full h-full z-20 top-[-50px] left-[-50px]"
      ></div>

      <div
        class="absolute lg:relative flex right-6 lg:right-0 justify-center w-[400px] lg:w-full lg:h-full items-center z-0"
      >
        <img src="/uploads/announcment.png" class="w-auto h-auto" />
      </div>

      <!-- Right Block (Text Right-Aligned) -->
      <div
        class="flex flex-col justify-between text-white text-left lg:items-end lg:text-right z-20"
      >
        <h3 class="app-text-h1 mb-[20px]">Анонс нової книги</h3>
        <p class="text-2xl leading-relaxed mt-4 mb-12">
          “Книга «Скепсис» – фронтова повість, заснована на подіях 2014-2015
          років. Я писав її, вражений дрімучою «совковістю», з котрою
          зіштовхнувся повз 12 років від звільнення з армії.”
        </p>

        <!-- Button (Right-Aligned) -->
        <AtomsAppOutlinedButton
          :value="data.button_more"
          color="white"
          class=""
        />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const adminDavDobro = ref(true);
</script>
