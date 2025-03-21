<template>
  <HomeBanner />
  <!-- <HomeHistory :data="translations" />
  <HomeAnouncment :data="translations" />
  <HomeDiscount :data="translations" /> -->
  <HomeBookList />
</template>

<script setup>
const { data: translations } = useNuxtData("translationsData");

console.log("translations", translations.value);
</script>
