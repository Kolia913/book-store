<template>
  <nav class="flex justify-between items-center px-12 pt-[30px] pb-[55px]">
    <div>
      <img src="/images/logo.png" height="84" />
    </div>
    <ul
      class="flex justify-between items-center rounded-3.5xl border border-black"
    >
      <li
        v-for="(link, idx) in links"
        :key="link.href + idx"
        class="py-6 px-12 text-3xl cursor-pointer hover:underline duration-200 rounded-3.5xl"
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
</template>
<script setup>
const route = useRoute();
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
</script>
