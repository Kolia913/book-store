"use strict";
const books = [
  {
    author: "Григорій Обертайло",
    title: "про скепсис",
    page_desc_caption: "Опис",
    draft: false,
    description:
      "Книга «Скепсис» – фронтова повість, заснована на подіях 2014-2015 років. Я писав її, вражений дрімучою «совковістю», з котрою зіштовхнувся повз 12 років від звільнення з армії. Жодних реформ не було проведено, «барство» й самодурство, що квітнули в період моєї служби (1994-2002) нікуди не поділися. Я знову повернувся в ту ж саму структуру, навіть більш деградовану. Але що таке є «армія»? Це в першу чергу, відзеркалення суспільства. І під час бойових дій це все вилізло назовні – некомпетентність командирів, відсутність ефективного управління й т.п. Я навмисно не вказував назви населених пунктів, бо тоді ще не був певен, чи не є ця інформація секретною. Проте зараз уже можна повісти, що до першої ротації моя батарея виконувала завдання в районі м. Щастя, потім у районі Станиці Луганської. Всі імена, прізвища й позивні змінені. У книзі присутні жарти, з елементами чорного гумору – на фронті без того ніяк. Нецензурної лексики я уникав свідомо, бо їй не місце в літературі. Напевне.",
    is_available: true,
    is_on_sale: false,
    price: 100,
    price_with_signature: 120,
    discount_price: null,
    discount_price_with_signature: null,
    images: [
      "/uploads/book1",
      "/uploads/book1",
      "/uploads/book1",
      "/uploads/book1",
    ],
  },
  {
    author: "Григорій Обертайло",
    title: "про розірвані ґердани",
    page_desc_caption: "Опис",
    draft: false,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    is_available: true,
    is_on_sale: true,
    price: 100,
    price_with_signature: 120,
    discount_price: 90,
    discount_price_with_signature: 110,
    images: ["/uploads/book2", "/uploads/book2"],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("bks_books", books);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("bks_books", null, {});
  },
};
