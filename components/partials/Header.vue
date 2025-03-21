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
    <div class="cursor-pointer" @click="() => scrollTo('#hero')">
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
          'bg-black text-white':
            link.href === `#${currentAnchor}` && !isNavWhite,
          'bg-white text-black':
            isNavWhite && link.href === `#${currentAnchor}`,
        }"
        @click="() => navigate(link.href)"
      >
        <div>
          {{ link.title }}
        </div>
      </li>
    </ul>
    <AtomsAppButton
      value="Кошик"
      @click="toggleCart"
      :color="isNavWhite ? 'white' : 'red'"
      class="relative"
    >
      <template #icon>
        <IconsCart />
        <div
          v-if="cartCount > 0"
          class="absolute bg-black -top-1 -left-1 rounded-[50%] w-6 h-6 pt-[2px] text-sm flex justify-center"
          :class="{
            'bg-primary-red text-white': isNavWhite,
          }"
        >
          {{ cartCount }}
        </div>
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
            'bg-black text-white': link.href === currentAnchor,
          }"
          @click="() => navigate(link.href)"
        >
          <div>
            {{ link.title }}
          </div>
          <IconsIconArrow width="30px" />
        </li>
        <AtomsAppButton
          value="Кошик"
          @click="toggleCart"
          color="red"
          class="w-full mt-4 relative"
        >
          <template #icon>
            <div
              v-if="cartCount > 0"
              class="absolute left-18 bg-black rounded-[50%] w-8 h-8 flex justify-center items-center"
            >
              {{ cartCount }}
            </div>
            <IconsCart />
          </template>
        </AtomsAppButton>
      </ul>
    </Transition>
  </nav>

  <ClientOnly>
    <Transition name="slide-fade">
      <PartialsCart v-if="isCartOpen" @close="toggleCart" />
    </Transition>
  </ClientOnly>
</template>
<script setup>
const route = useRoute();
const router = useRouter();

const isNavWhite = computed(() => route.path === "/extended-history");
const isNavShown = ref(false);
const isScrolled = ref(false);
const isCartOpen = ref(false);
const currentAnchor = ref("");

const translationsStore = useTranslationsStore();
const cartStore = useCartStore();

const links = computed(() => translationsStore.getHeaderLinks);
const cartCount = computed(() => cartStore.count);

const openNav = () => {
  isNavShown.value = !isNavShown.value;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
  isNavShown.value = false;
};

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isScrolled.value = scrollPosition > 0;
};

function scrollTo(anchor) {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function navigate(anchor) {
  if (isNavShown.value) isNavShown.value = false;
  currentAnchor.value = anchor;
  if (route.path !== "/") {
    router.push("/").then(scrollTo(anchor));
  } else {
    scrollTo(anchor);
  }
}

const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentAnchor.value = entry.target.id;
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  links.value.forEach((link) => {
    const section = document.querySelector(link.href);
    if (section) {
      observer.observe(section);
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  setupIntersectionObserver();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.path,
  () => {
    isNavShown.value = false;
    setupIntersectionObserver();
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
