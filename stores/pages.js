export const usePageStore = defineStore("pages", {
  state: () => ({
    pages: {},
  }),
  actions: {
    async fetchPageByKey(key) {
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
