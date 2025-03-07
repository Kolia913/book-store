<template>
  <footer
    class="w-full flex justify-center py-12 bg-black bg-footer-pattern bg-cover bg-center text-white"
  >
    <div class="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <IconsIconLogo class="w-[fit-content] h-[80%] self-center" />
      <ul class="flex app-text-body flex-col lg:items-center justify-between">
        <div class="app-text-body-2 font-bold mb-2">Сайт</div>
        <li
          v-for="(link, idx) in links"
          :key="link.href + idx"
          class="text-lg lg:text-xl cursor-pointer hover:underline duration-200 rounded-3.5xl pb-2"
        >
          <NuxtLink :to="link.href">
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex app-text-body flex-col justify-between">
        <div class="app-text-body-2 font-bold mb-2">Інформація</div>
        <li
          v-for="(link, idx) in info"
          :key="link.href + idx"
          class="text-lg lg:text-xl cursor-pointer hover:underline duration-200 rounded-3.5xl pb-2"
        >
          <NuxtLink :to="link.href">
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex flex-col justify-between">
        <div class="app-text-body-2 font-bold">
          Григорій Обертайло
          <div class="flex items-center gap-12 h-fit">
            <IconsIconInstagram class="w-[30px]" />
            <IconsIconFacebook class="w-[30px]" />
            <IconsIconYoutube class="w-[30px]" />
          </div>
        </div>

        <div class="text-gray-400 text-sm">
          Kyiv Type Serif font by Dmitry Rastvortsev, licensed under CC BY-ND
          4.0
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const route = useRoute();

const links = ref([
  {
    title: "книги",
    href: "/books",
  },
  {
    title: "автор",
    href: "/",
  },
  {
    title: "анонс",
    href: "/anons",
  },
  {
    title: "акція",
    href: "/sale",
  },
]);
const info = ref([
  {
    title: "доставка і оплата",
    href: "/books",
  },
  {
    title: "співпраця",
    href: "/",
  },
  {
    title: "повернення товару",
    href: "/anons",
  },
  {
    title: "події",
    href: "/sale",
  },
]);
</script>
<style scoped>
.bg-footer-pattern {
  background-image: url("/path/to/your/footer-background.jpg");
}
</style>
