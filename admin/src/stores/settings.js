import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('settings', () => {
  const currentTheme = ref(localStorage.theme);
  const isMobileAsideOpen = ref(false);

  function toggleMobileAside() {
    isMobileAsideOpen.value = !isMobileAsideOpen.value;
  }
  function changeTheme(variant) {
    if (!variant) {
      localStorage.removeItem('theme');
      currentTheme.value = undefined;
    } else {
      localStorage.theme = variant;
      currentTheme.value = variant;
    }
    if (
      variant === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  return {
    currentTheme,
    isMobileAsideOpen,
    toggleMobileAside,
    changeTheme,
  };
});
