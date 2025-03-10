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
      class="flex justify-between items-center rounded-3xl border border-black"
      :class="{
        'border-white': isNavWhite,
      }"
    >
      <li
        v-for="(link, idx) in links"
        :key="link.href + idx"
        class="py-4 px-8 text-xl lg:text-2xl cursor-pointer hover:underline duration-200 rounded-3xl"
        :class="{
          'bg-black text-white': link.href === route.path,
        }"
      >
        <NuxtLink :to="link.href">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
    <AtomsAppButton
      value="Кошик"
      @click="toggleCart"
      :color="isNavWhite ? 'white' : 'red'"
    >
      <template #icon>
        <IconsCart />
      </template>
    </AtomsAppButton>
  </nav>
  <!-- Mobile nav -->
  <nav
    class="flex lg:hidden fixed justify-between items-center px-2 z-60 w-full bg-transparent transition-all duration-300 ease-in-out"
    :class="{
      'bg-white fixed text-black': isScrolled,
      'text-white': !isScrolled && isNavWhite && !isNavShown,
      'text-black': !isNavWhite && !isScrolled,
      'text-black bg-white': isNavShown && isNavWhite,
    }"
  >
    <div class="w-full flex justify-between flex-row z-55">
      <IconsIconLogo width="100px" height="100%" />
      <IconsIconCross v-if="isNavShown" width="40px" @click="openNav" />
      <IconsIconBurger v-else width="40px" @click="openNav" />
    </div>
    <Transition name="slide">
      <ul
        v-show="isNavShown"
        class="absolute top-17 w-full left-0 flex flex-col items-start px-2 rounded-b-2xl py-2 border-b border-black bg-white"
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
        <AtomsAppButton
          value="Кошик"
          @click="toggleCart"
          color="red"
          class="w-full mt-4"
        >
          <template #icon>
            <IconsCart />
          </template>
        </AtomsAppButton>
      </ul>
    </Transition>
  </nav>
  <Transition name="slide-fade">
    <PartialsCart v-if="isCartOpen" @close="toggleCart" />
  </Transition>
</template>
<script setup>
const route = useRoute();
const isNavWhite = computed(() => route.path === "/extended-history");
const isNavShown = ref(false);
const isScrolled = ref(false);
const isCartOpen = ref(false);

const openNav = () => {
  isNavShown.value = !isNavShown.value;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
  isNavShown.value = false;
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

watch(
  () => route.path,
  () => {
    isNavShown.value = false;
  }
);
</script>

<style scoped>
li:nth-last-child(1) {
  border: none;
}
.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
