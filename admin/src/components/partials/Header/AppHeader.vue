<template>
  <div
    class="fixed top-0 flex flex-row gap-2 justify-between items-center h-16 border-b w-full bg-white lg:px-8 px-2 header dark:bg-grey-dark-100 dark:border-b-grey-dark-border"
  >
    <div class="justify-self-start">
      <Burger :active="isMobileAsideOpen" @toggleMenu="toggleAside" />
    </div>
    <div class="flex flex-row lg:gap-6 gap-2">  
      <!-- <div
        class="relative w-10 h-10 flex justify-center items-center cursor-pointer"
        @click="openNotifications"
      >
        <AppBadge class="w-5 h-5 absolute top-0 right-0" :count="0" />
        <BellIcon class="w-8 h-8" />
      </div> -->
      <!-- <div
        class="relative w-10 h-10 flex justify-center items-center cursor-pointer"
      >
      <v-icon
        name="bi-gear"
        :scale="1.3"
        :color="isActive ? (isDarkTheme ? '#FBBF24' : '#D97707') : 'rgb(234, 228, 228);'" 
        @click="openOptions"
      /> 
      </div> -->
      <div
        class="rounded-full overflow-hidden cursor-pointer avatar"
        @click="toggleProfileDropdown(true)"
      >
        <AvatarDemo class="w-10 h-10" />
      </div>
    </div>
    <div class="absolute top-14 lg:right-8 right-2">
      <ProfileDropdown
        :is-open="isProfileDropDownShown"
        :current-theme="currentTheme"
        @onCloseDropdown="toggleProfileDropdown(false)"
        @onThemeChange="settingsStore.changeTheme"
        @onSignOut="signOut"
      />
    </div>
    <Teleport to="#app">
      <!-- <NotificationsAside
        :isNotificationsOpen="isNotificationsOpen"
        @onClose="isNotificationsOpen = false"
      /> -->
      <OptionsAside
        :isOptionsOpen="isOptionsOpen"
        @onClose="isOptionsOpen = false"
      />
    </Teleport>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
// import SearchInput from '@/components/atoms/inputs/SearchInput.vue';
// import BellIcon from '@/components/icons/BellIcon.vue';
import AvatarDemo from '@/components/icons/AvatarDemo.vue';
// import AppBadge from '@/components/atoms/AppBadge.vue';
import Burger from '@/components/atoms/buttons/Burger.vue';
import ProfileDropdown from './ProfileDropdown.vue';
// import NotificationsAside from '../NotificationsAside/NotificationsAside.vue';

import useSettingsStore from '@/stores/settings';
import useAuthStore from '@/stores/auth';

import { useRouter } from 'vue-router';
import OptionsAside from './OptionsAside.vue';

const router = useRouter();

const settingsStore = useSettingsStore();
const authStore = useAuthStore(0);

const isProfileDropDownShown = ref(false);
// const isNotificationsOpen = ref(false);
const isOptionsOpen = ref(false)

const currentTheme = computed(() => settingsStore.currentTheme);
const isMobileAsideOpen = computed(() => settingsStore.isMobileAsideOpen);

function toggleAside() {
  settingsStore.toggleMobileAside();
}
function toggleProfileDropdown(value) {
  isProfileDropDownShown.value = value;
}
// function openNotifications() {
//   isNotificationsOpen.value = true;
// }
// function openOptions(){
//   isOptionsOpen.value = true;
// }
function signOut() {
  authStore.logout().then(() => {
    router.push('/login');
  });
}
</script>
<style lang="scss" scoped>
.header {
  z-index: 5;
  padding-left: 340px;
  @media screen and (max-width: 1280px) {
    padding-left: 280px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 8px;
  }
}
.avatar {
  min-width: 40px;
}
</style>
