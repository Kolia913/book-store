export const usePageStore = defineStore("pages", {
  state: () => ({
    pages: {},
  }),
  actions: {
    async fetchPages() {
      try {
        const res = await $fetch("/api/pages");
        this.pages = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async fetchPageByKet(key) {
      try {
        const res = await $fetch(`/api/pages/web/${key}`);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot));
}
