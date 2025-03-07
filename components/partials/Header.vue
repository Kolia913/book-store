<template>
  <!-- Desktop nav -->
  <nav
    class="hidden lg:flex fixed justify-between items-center px-4 xl:px-16 py-4 z-55 w-full transition-all duration-300 ease-in-out"
    :class="{
      'text-white': isNavWhite,
      'text-black': !isNavWhite,
      'bg-black': isScrolled,
      'bg-white': isScrolled && !isNavWhite,
    }"
  >
    <div>
      <IconsIconLogo width="150px" height="100%" />
    </div>
    <ul
      class="flex justify-between items-center rounded-3.5xl border border-black"
      :class="{
        'border-white': isNavWhite,
      }"
    >
      <li
        v-for="(link, idx) in links"
        :key="link.href + idx"
        class="py-4 px-8 text-xl lg:text-2xl cursor-pointer hover:underline duration-200 rounded-3.5xl"
        :class="{
          'bg-black text-white': link.href === route.path,
        }"
      >
        <NuxtLink :to="link.href">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
    <AtomsAppButton value="Кошик" @click="console.log(123)" color="red">
      <template #icon>
        <IconsCart />
      </template>
    </AtomsAppButton>
  </nav>
  <!-- Mobile nav -->
  <nav
    class="flex lg:hidden fixed justify-between items-center px-2 z-55 w-full bg-transparent transition-all duration-300 ease-in-out"
    :class="{
      'bg-white fixed text-black': isScrolled,
      'text-white': !isScrolled && isNavWhite,
      'text-black': !isNavWhite && !isScrolled,
    }"
  >
    <div class="w-full flex justify-between flex-row">
      <IconsIconLogo width="100px" height="100%" />
      <IconsIconBurger width="40px" @click="openNav" />
    </div>
    <ul
      v-show="isNavShown"
      class="absolute top-20 w-spec flex flex-col items-start px-2 py-2 rounded-2xl border border-black bg-white"
    >
      <li
        v-for="(link, idx) in links"
        :key="link.href + idx"
        class="w-full flex justify-between px-1 py-1 text-3xl cursor-pointer border-b-1 hover:underline duration-200 text-black"
        :class="{
          'bg-black text-white': link.href === route.path,
        }"
      >
        <NuxtLink :to="link.href">
          {{ link.title }}
        </NuxtLink>
        <IconsIconArrow width="30px" />
      </li>
    </ul>
  </nav>
</template>
<script setup>
const route = useRoute();
const isNavWhite = computed(() => route.path === "/extended-history");
const isNavShown = ref(false);
const isScrolled = ref(false);

const openNav = () => {
  isNavShown.value = !isNavShown.value;
};

const links = ref([
  {
    title: "Книги",
    href: "/books",
  },
  {
    title: "Автор",
    href: "/",
  },
  {
    title: "Анонс",
    href: "/anons",
  },
  {
    title: "Акція",
    href: "/sale",
  },
  {
    title: "Події",
    href: "/events",
  },
]);

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isScrolled.value = scrollPosition > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.w-spec {
  width: calc(100% - 1rem);
}
.bg-gray-800 {
  background-color: #2d3748;
}
</style>
