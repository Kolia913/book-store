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
          v-for="(link, idx) in visibleLinks"
          :key="link.href + idx"
          class="text-lg lg:text-xl cursor-pointer hover:underline duration-200 rounded-3.5xl pb-2 relative"
        >
          <div @click="() => navigate(link.href)"> 
            {{ link.title }}
          </div>
           
         
          
        </li>
      </ul>
      <ul class="flex app-text-body flex-col justify-between">
        <div class="app-text-body-2 font-bold mb-2">
          {{ otherTranslations.footer_info_title }}
        </div>
        <li
          v-for="(link, idx) in linksTranslations.info"
          :key="link.href + idx"
          class="text-lg lg:text-xl cursor-pointer hover:underline duration-200 rounded-3.5xl pb-2 relative"
          @click="toggleHint(link.hint)"
        >
          <div>
            {{ link.title }}
          </div>
          <Transition name="fade">
          <div
            v-if="isHintVisible && currentHint === link.hint"
            class="absolute bottom-full mb-2 bg-white text-black p-4 rounded drop-shadow-2xl text-sm z-50  lg:w-[500px] max-h-[350px] overflow-y-auto "
          >
            <button
              class="absolute top-0 right-1 text-black font-bold cursor-pointer p-2"
              @click.stop="closeHint"
            >
              ✕
            </button>
            <div class="cursor-default" v-html="hintMessage"></div>
          </div>
        </Transition>
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
import { ref, computed } from "vue";

const translationsStore = useTranslationsStore();

const linksTranslations = computed(() => translationsStore.getFooterLinks);
const otherTranslations = computed(
  () => translationsStore.getFooterTranslations
);
const visibleLinks = computed(() => {
  const allLinks = translationsStore.getHeaderLinks;
  const inactiveLinks = translationsStore.inactiveLinks || [];
  return allLinks.filter(link => !inactiveLinks.includes(link.href));
});
const route = useRoute();
const router = useRouter();

const isHintVisible = ref(false);
const hintMessage = ref("");
const currentHint = ref("");

const toggleHint = (message) => {
    
 
    hintMessage.value = message;
    currentHint.value = message;
    isHintVisible.value = true;
  
};
function scrollTo(anchor) {
  const element = document.querySelector(anchor);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
function navigate(anchor) {

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
const closeHint = () => {
  isHintVisible.value = false;
  currentHint.value = "";
};


</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;

}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>