<template>
  <div
    class="py-[38px] px-4 pt-25 lg:px-12 lg:py-50 xl:py-60 flex flex-col xl:flex-row xl:gap-8 justify-between"
  >
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <div
        class="flex flex-col-reverse xl:flex-row justify-center items-center gap-5 w-full max-w-[450px] lg:w-[450px] lg:h-fit z-0"
      >
        <div
          class="flex flex-row xl:flex-col h-full justify-center gap-9 lg:gap-4 xl:gap-8"
        >
          <div>
            <img
              :src="book.image"
              class="cursor-pointer xl:max-w-[100px] max-h-[100px]"
            />
          </div>
          <div>
            <img
              :src="book.image"
              class="cursor-pointer xl:max-w-[100px] max-h-[100px]"
            />
          </div>
          <div>
            <img
              :src="book.image"
              class="cursor-pointer xl:max-w-[100px] max-h-[100px]"
            />
          </div>
          <div>
            <img
              :src="book.image"
              class="cursor-pointer xl:max-w-[100px] max-h-[100px]"
            />
          </div>
        </div>
        <img :src="book.image" class="w-full max-w-[400px] h-full" />
      </div>
      <div class="w-full xl:w-[500px] 2xl:w-[550px] self-start xl:self-center">
        <div class="app-text-h1 mb-[20px] italic">ОПИС</div>
        <p class="app-text-small leading-relaxed mt-4 mb-12 lg:mb-0">
          {{ book.description }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col justify-between text-black text-left xl:items-end xl:text-right z-20 mt-8 xl:mt-0"
    >
      <div class="text-4xl my-[20px] xl:mt-0 xl:text-3xl 2xl:text-5xl italic">
        Григорій Обертайло <br />
        <span class="uppercase">'{{ book.title }}'</span>
      </div>

      <div class="flex w-full flex-col md:flex-row xl:flex-col gap-8 xl:gap-4">
        <div class="w-full xl:w-[280px] 2xl:w-[380px] self-end">
          <div class="flex items-center justify-between pb-2">
            <span class="text-lg italic">в наявності</span>
            <span class="text-2xl">100 $</span>
          </div>
          <AtomsAppOutlinedButton
            value="купити"
            color="black"
            class="text-lg w-full uppercase"
          />
        </div>
        <div class="w-full xl:w-[280px] 2xl:w-[380px] self-end">
          <div class="flex items-center justify-between pb-2">
            <span class="text-lg italic">в наявності</span>
            <span class="text-2xl">100$</span>
          </div>
          <AtomsAppOutlinedButton
            value="купити з підписом автора"
            color="filled"
            class="text-lg w-full uppercase"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const book = computed(() => {
  try {
    return JSON.parse(route.query.item || "{}");
  } catch (e) {
    return { title: "", description: "", image: "" };
  }
});
</script>
