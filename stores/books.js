export const useBooksStore = defineStore("books", {
  state: () => ({
    books: {},
  }),
  actions: {
    async fetchBooks() {
      try {
        const res = await $fetch("/api/books");
        this.books = res.filter(book => !book.draft);
        return this.books;
      } catch (error) {
        throw error;
      }
    },
    async fetchBookById(id) {
      try {
        const res = await $fetch(`/api/books/${id}`);
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
