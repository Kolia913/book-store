export const useTranslationsStore = defineStore("translations", {
  state: () => ({
    translations: {},
  }),
  actions: {
    async fetchTranslations() {
      try {
        const res = await $fetch("/api/translations");
        this.translations = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    getHeaderLinks: (state) => {
      return [
        {
          title: state.translations.header_link_author || "Автор",
          href: "#story",
        },
        {
          title: state.translations.header_link_announcement || "Анонс",
          href: "#anons",
        },
        {
          title: state.translations.header_link_sale || "Акції",
          href: "#sale",
        },
        {
          title: state.translations.header_link_books || "Книги",
          href: "#books",
        },
        {
          title: state.translations.header_link_events || "Події",
          href: "#events",
        },
      ];
    },

    getFooterLinks: (state) => {
      return {
        info: [
          {
            title:
              state.translations.footer_info_delivery_and_payment ||
              "Доставка та оплата",
            href: "#story",
          },
          {
            title: state.translations.footer_info_cooperation || "Співпраця",
            href: "#anons",
          },
          {
            title: state.translations.footer_info_refund || "Повернення",
            href: "#sale",
          },
          {
            title: state.translations.footer_info_events || "Події",
            href: "#books",
          },
        ],
        links: [
          {
            title: state.translations.footer_link_author || "Автор",
            href: "#story",
          },

          {
            title: state.translations.footer_link_announcement || "Анонс",
            href: "#anons",
          },
          {
            title: state.translations.footer_link_sale || "Акції",
            href: "#sale",
          },
          {
            title: state.translations.footer_link_books || "Книги",
            href: "#books",
          },
          {
            title: state.translations.footer_info_events || "Події",
            href: "#events",
          },
        ],
      };
    },

    getFooterTranslations: (state) => ({
      footer_links_title: state.translations.footer_links_title || "Сайт",
      footer_info_title: state.translations.footer_info_title || "Інформація",
      general_author_name:
        state.translations.general_author_name || "Григорій Обертайло",
      footer_links_title: state.translations.footer_links_title || "Сайт",
      instagram_link: state.translations.instagram_link || "/",
      facebook_link: state.translations.facebook_link || "/",
      youtube_link: state.translations.youtube_link || "/",
      footer_license: state.translations.footer_license || "",
    }),

    getOtherTranslations: (state) => ({
      available: state.translations.available,
      not_available: state.translations.not_available,
      button_buy: state.translations.button_buy,
      button_more: state.translations.button_more,
      buy_with_signature: state.translations.buy_with_signature,
      cart_checkout: state.translations.cart_checkout,
      cart_delete: state.translations.cart_delete,
      cart_delete_all: state.translations.cart_delete_all,
      quantity_postfix: state.translations.quantity_postfix,
    }),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useTranslationsStore, import.meta.hot)
  );
}
