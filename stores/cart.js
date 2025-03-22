export const useCartStore = defineStore("cart", {
  state: () => ({
    cartContent: {},
  }),
  hydrate(state, initialState) {
    if (process.client) {
      state.cartContent = JSON.parse(localStorage.getItem("cart")) ?? {};
    }
  },

  actions: {
    updateCartItem(bookId, quantity) {
      if (quantity <= 0) {
        delete this.cartContent[bookId];
      } else {
        this.cartContent[bookId] = { bookId, quantity };
      }
      this.saveCart();
    },
    addItem(bookId) {
      if (this.cartContent.hasOwnProperty(bookId)) {
        this.cartContent[bookId] = {
          bookId,
          quantity: this.cartContent[bookId].quantity + 1,
        };
      } else {
        this.cartContent[bookId] = {
          bookId,
          quantity: 1,
        };
      }
      this.saveCart();
    },
    removeItem(bookId) {
      const currentQuantity = this.cartContent[bookId]?.quantity || 0;
      this.updateCartItem(bookId, currentQuantity - 1);
    },
    removeFromCart(bookId) {
      if (this.cartContent[bookId]) {
        delete this.cartContent[bookId];
        this.saveCart();
      }
    },
    saveCart() {
      if (process.client) {
        try {
          localStorage.setItem("cart", JSON.stringify(this.cartContent));
        } catch (error) {
          console.error("Failed to save cart to localStorage:", error);
        }
      }
    },
    clearCart() {
      this.cartContent = {};
      this.saveCart();
    },
  },
  getters: {
    count() {
      return Object.keys(this.cartContent).reduce((acc, id) => {
        return acc + this.cartContent[id].quantity;
      }, 0);
    },

    total() {
      const booksStore = useBooksStore();
      const books = booksStore.books;
      return Object.keys(this.cartContent).reduce((acc, id) => {
        const book = books.find((b) => b.id === this.cartContent[id].bookId);
        if (book) {
          return acc + book.price * this.cartContent[id].quantity;
        }
        return acc + 0;
      }, 0);
    },

    formattedCart() {
      const booksStore = useBooksStore();
      const books = booksStore.books;

      if (!booksStore.books) return [];

      return Object.keys(this.cartContent)
        .map((bookId) => {
          const purchase = this.cartContent[bookId];
          const book = books.find((b) => b.id === purchase.bookId);
          if (!book) return null;

          return {
            id: purchase.bookId,
            image: book.images[0],
            title: book.title,
            quantity: purchase.quantity,
            cost: purchase.quantity * book.price,
          };
        })
        .filter((item) => item !== null);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
