<template>
  <footer
    class="w-full flex justify-center py-12 bg-black bg-footer-pattern bg-cover bg-center text-white"
  >
    <div class="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <IconsIconLogo class="w-[fit-content] h-[80%] self-center" />
      <ul class="flex app-text-body flex-col lg:items-center justify-between">
        <div class="app-text-body-2 font-bold mb-2">
          {{ otherTranslations.footer_links_title }}
        </div>
        <li
          v-for="(link, idx) in linksTranslations.links"
          :key="link.href + idx"
          class="text-lg lg:text-xl cursor-pointer hover:underline duration-200 rounded-3.5xl pb-2"
        >
          <NuxtLink :to="link.href">
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex app-text-body flex-col justify-between">
        <div class="app-text-body-2 font-bold mb-2">
          {{ otherTranslations.footer_info_title }}
        </div>
        <li
          v-for="(link, idx) in linksTranslations.info"
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
          {{ otherTranslations.general_author_name }}
          <div class="flex items-center gap-12 h-fit">
            <NuxtLink :to="otherTranslations.instagram_link" target="_blank">
              <IconsIconInstagram class="w-[30px]" />
            </NuxtLink>
            <NuxtLink :to="otherTranslations.facebook_link" target="_blank">
              <IconsIconFacebook class="w-[30px]" />
            </NuxtLink>
            <NuxtLink :to="otherTranslations.youtube_link" target="_blank">
              <IconsIconYoutube class="w-[30px]" />
            </NuxtLink>
          </div>
        </div>

        <div class="text-gray-400 text-sm">
          {{ otherTranslations.footer_license }}
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const translationsStore = useTranslationsStore();

const { data: translations } = useNuxtData("translations");

if (!translations.value) {
  translationsStore.fetchTranslations();
}

const linksTranslations = computed(() => translationsStore.getFooterLinks);
const otherTranslations = computed(
  () => translationsStore.getFooterTranslations
);
</script>
<style scoped>
.bg-footer-pattern {
  background-image: url("/path/to/your/footer-background.jpg");
}
</style>
