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
    <!-- Logo -->
    <div class="cursor-pointer" @click="() => router.push('/').then(scrollTo('#hero'))">
      <IconsIconLogo width="150px" height="100%" />
    </div>

    <!-- Navigation Links -->
    <ul
      class="flex justify-between items-center rounded-3xl border border-black"
      :class="{
        'border-white': isNavWhite,
      }"
    >
      <li
        v-for="(link, idx) in visibleLinks"
        :key="link.href + idx"
        class="py-4 px-8 text-xl lg:text-2xl cursor-pointer hover:underline duration-200 rounded-3xl"
        :class="{
          'bg-black text-white': link.href === `#${currentAnchor}` && !isNavWhite,
          'bg-white text-black': isNavWhite && link.href === `#${currentAnchor}`,
        }"
        @click="() => navigate(link.href)"
      >
        <div>
          {{ link.title }}
        </div>
      </li>
    </ul>

    <!-- Cart Button -->
    <AtomsAppButton
      value="Кошик"
      @click="toggleCart"
      :color="isNavWhite ? 'white' : 'red'"
      class="relative"
      :class="{
        invisible: $route.path === '/order',
      }"
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
    <div class="w-full flex justify-between items-center flex-row z-55">
      <IconsIconLogo width="100px" height="100%" @click="() => router.push('/').then(scrollTo('#hero'))"/>
        <AtomsAppButton
          v-if="$route.path !== '/order'"
          value="Кошик"
          @click="toggleCart"
          color="red"
          class="relative scale-80"
        >
          <template #icon>
            <div
              v-if="cartCount > 0"
              class="absolute -left-2 top-0 bg-black rounded-[50%] w-7 h-7 flex justify-center items-center"
            >
              {{ cartCount }}
            </div>
            <IconsCart />
          </template>
        </AtomsAppButton>
      <!-- <IconsIconCross v-if="isNavShown" width="40px" @click="openNav" />
      <IconsIconBurger v-else width="40px" @click="openNav" /> -->
    </div>
    <Transition name="slide">
      <ul
        v-show="isNavShown"
        class="absolute top-17 w-full left-0 flex flex-col items-start px-2 rounded-b-2xl py-2 border-b border-black bg-white"
      >
        <li
          v-for="(link, idx) in visibleLinks"
          :key="link.href + idx"
          class="w-full flex justify-between px-1 py-1 text-3xl cursor-pointer border-b-1 hover:underline duration-200 text-black"
          :class="{
            'bg-black text-white': link.href === `#${currentAnchor}`,
          }"
          @click="() => navigate(link.href)"
        >
          <div>
            {{ link.title }}
          </div>
          <IconsIconArrow width="30px" />
        </li>
        
      </ul>
    </Transition>
  </nav>
  <ClientOnly>
    <Transition name="slide-fade">
      <PartialsCart
        v-if="isCartOpen && route.path !== '/order'"
        @close="toggleCart"
      />
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
const observer = ref(null);

const translationsStore = useTranslationsStore();
const cartStore = useCartStore();

const visibleLinks = computed(() => {
  const allLinks = translationsStore.getHeaderLinks;
  const inactiveLinks = translationsStore.inactiveLinks || [];
  return allLinks.filter(link => !inactiveLinks.includes(link.href));
});

const cartCount = computed(() => cartStore.count);

const openNav = () => {
  isNavShown.value = !isNavShown.value;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
  isNavShown.value = false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

function scrollTo(anchor) {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function navigate(anchor) {
  if (isNavShown.value) isNavShown.value = false;

  if (route.path !== '/') {
    router.push({ path: '/', hash: anchor }).then(() => {
      nextTick(() => {
        scrollTo(anchor);
      });
    });
  } else {
    scrollTo(anchor);
  }
}

const setupIntersectionObserver = () => {
  if (observer.value) {
    observer.value.disconnect();
  }

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

  observer.value = new IntersectionObserver(callback, options);

  visibleLinks.value.forEach((link) => {
    const section = document.querySelector(link.href);
    if (section) {
      observer.value.observe(section);
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  
  // Set initial current anchor if at top of page
  if (visibleLinks.value.length > 0 && window.scrollY === 0) {
    currentAnchor.value = visibleLinks.value[0].href.replace('#', '');
  }
  
  setupIntersectionObserver();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (observer.value) {
    observer.value.disconnect();
  }
});

watch(
  () => route.path,
  () => {
    isNavShown.value = false;
    nextTick(setupIntersectionObserver);
  }
);

watch(
  () => visibleLinks.value,
  () => {
    nextTick(setupIntersectionObserver);
  },
  { deep: true }
);
</script>