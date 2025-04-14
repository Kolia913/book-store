export const useEventsStore = defineStore("events", {
    actions: {
      async fetchEvents() {
        try {
          const res = await $fetch("/api/events");
          return res;
        } catch (error) {
          throw error;
        }
      },
      async fetchEventsById(id) {
        try {
          const res = await $fetch(`/api/events/${id}`);
          return res;
        } catch (error) {
          throw error;
        }
      },
    },
  });
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBooksStore, import.meta.hot));
  }
  