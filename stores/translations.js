export const useTranslationsStore = defineStore("translations", {
  state: () => ({
    translations: {},
    inactiveLinks: [],
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
    setHeaderLinkInactive(href) {
      if (!this.inactiveLinks.includes(href)) {
        this.inactiveLinks.push(href);
      }
    },
  },
  getters: {
    getHeaderLinks: (state) => {
      return [
        {
          title: state.translations.header_link_books,
          href: "#books",
          isActive: true,
        },
        {
          title: state.translations.header_link_announcement,
          href: "#anons",
          isActive: true,
        },
        {
          title: state.translations.header_link_sale,
          href: "#sale",
          isActive: true,
        },

        {
          title: state.translations.header_link_author,
          href: "#story",
          isActive: true,
        },
        {
          title: state.translations.header_link_events,
          href: "#events",
          isActive: true,
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
            hint: `<div class="font-[700] text-[18px]">Варіанти оплати:</div><br> - Оплата платіжними картами Visa та MasterCard - WayForPay<br><div class="font-[700] text-[18px]">Доставка у відділення «Нова пошта»</div><br>Зазвичай доставка займає 1-3 днів Вартість доставки розраховується відповідно до тарифів сервісу доставки.<br><br> Ми забезпечуємо швидку доставку товарів по всій країні. Відправлення відбувається щодня.`,
          },
          {
            title: state.translations.footer_info_cooperation || "Співпраця",
            href: "#anons",
            hint: `<div class="font-[700] text-[18px]">Контактна інформація:</div> <br>ФОП Бруньковський Володимир Віталійович<br><br> ЄДРПОУ 2811616895<br><br><a href="mailto:vop.obert@gmail.com" style="color: blue;">vop.obert@gmail.com</a> <br>тел: 0686538603`,
          },
          {
            title: state.translations.footer_info_refund || "Повернення",
            href: "#sale",
            hint: `<div class="font-[700] text-[18px]">Повернення та обмін</div><br/>Відповідно до Постанови Кабінету Міністрів України від 19 березня 1994 р. № 172 "Про реалізацію окремих положень Закону України "Про захист прав споживачів" друковані видання належної якості не підлягають обміну, поверненню. <br/> <br/> У випадку виявлення поліграфічного браку книжкової продукції Продавець, за бажанням Покупця, здійснює повернення коштів у розмірі вартості повернутої продукції. Поліграфічний брак – це брак, отриманий внаслідок недотримання технології виробництва, що призводить до перекручування або втрати інформації: розмазування фарби, непродруковування фарби, нечіткий друк, склеєні сторінки, нерівне обрізання, перевернуті аркуші, відсутність аркушів, або їх повторення, невідповідність назви книжки на обкладинці її змісту, тощо.<br/> <br/>Покупець має право повернути браковану книжкову продукції протягом 14 днів з моменту отримання. Для цього слід звернувшись за тел. +380686538603, або написавши на e-mail: <a href="mailto:vop.obert@gmail.com" style="color: blue;">vop.obert@gmail.com</a><br/> <br/>Повернення бракованої продукції здійснюється за рахунок Продавця. Продавець здійснює повернення коштів Покупцю, у розмірі вартості повернутої продукції, або обмін на аналогічний якісний взірець примірника, після отримання Продавцем книжкової продукції з елементами поліграфічного браку.`,
          },
          // {
          //   title: state.translations.footer_info_events || "Події",
          //   href: "#books",
          // },
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
