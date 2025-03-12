"use strict";
const pages = [
  {
    key: "home",
    admin_title: "Головна",
    title: "Головна",
    content: JSON.stringify({
      banner: {
        admin_title: "Баннер",
        author: {
          admin_title: "Слово автор",
          type: "string",
          value: "автор",
        },
        authorName: {
          admin_title: "Імʼя автора",
          type: "string",
          value: "Григорій Обертайло",
        },
        image: {
          admin_title: "Зображення",
          type: "image",
          value: "/public/images/banner.png",
        },
        isActive: true,
      },
      history: {
        admin_title: "Моя історія",
        title: {
          admin_title: "Заголовок",
          type: "string",
          value: "моя історія",
        },
        description: {
          admin_title: "Історія",
          type: "text",
          value: `Явився я на світ Божий останнього місяця сімдесят шостого року двадцятого сторіччя – саме тоді, коли зародились перші бактерії з водоростями. Тоді бронтозаври чубились зі стегозаврами за володіння найвигіднішими галявинами, порослими древньою соковитою травичкою, а безсердні шаблезубі тигри тільки й дивились, як зʼїсти переможця тої борні – це я написав для прикладу, аби поколінню міленіалів було зрозуміліше. 
          Для старшого сегменту й так ясно, що народився я в часи розквіту тричі клятого вошивого «совка», най би його шляки трафили.`,
        },
        image: {
          admin_title: "Зображення",
          type: "image",
          value: "/public/images/history.png",
        },
        isActive: true,
      },
      announcement: {
        admin_title: "Анонс",
        bookId: {
          admin_title: "ID книги",
          type: "foreign_key",
          value: 1,
        },
        title: {
          admin_title: "Заголовок",
          type: "string",
          value: "Анонс нової книги",
        },
        description: {
          admin_title: "Опис",
          type: "text",
          value: `“Книга «Скепсис» – фронтова повість, заснована на подіях 2014-2015 років. Я писав її, вражений дрімучою «совковістю», з котрою зіштовхнувся повз 12 років від звільнення з армії. ”`,
        },
        image: {
          type: "image",
          admin_title: "Зображення",
          value: "/public/images/announcement.png",
        },
        isActive: true,
      },
      sale: {
        admin_title: "Акції",
        titlePart1: {
          admin_title: "Заголовок частина 1",
          type: "string",
          value: "Отримай",
        },
        discountPrecent: {
          admin_title: "Знижка",
          type: "number",
          value: "10",
        },
        titlePart2: {
          admin_title: "Заголовок частина 2",
          type: "string",
          value: "На ці книги",
        },
        isActive: true,
      },
      books: {
        admin_title: "Книги",
        title: {
          admin_title: "Заголовок",
          type: "string",
          value: "Книги",
        },
        isActive: true,
      },
    }),
  },
  {
    key: "extended-history",
    admin_title: "Моя історія",
    title: "Моя історія",
    content: JSON.stringify({
      banner: {
        admin_title: "Баннер",
        title: {
          admin_title: "Заголовок",
          type: "string",
          value: "Моя історія",
        },
        image: {
          admin_title: "Зображення",
          type: "image",
          value: "/public/images/banner2.png",
        },
        isActive: true,
      },
      interview: {
        admin_title: "Інтерв'ю",
        title: {
          admin_title: "Заголовок",
          type: "string",
          value: "Інтерв'ю",
        },
        content: {
          admin_title: "Вміст",
          type: "text",
          value: `Вітаю, любий читачу. Зазвичай ніхто не заглядає на подібні розділи на сайтах, проте ти це зробив, честь тобі й хвала! Тому намагатимусь розвеселити твоє серце й піднести настрій коротким описом свого буремного, проте не надто оригінального життєвого шляху.

Явився я на світ Божий останнього місяця сімдесят шостого року двадцятого сторіччя – саме тоді, коли зародились перші бактерії з водоростями. Тоді бронтозаври чубились зі стегозаврами за володіння найвигіднішими галявинами, порослими древньою соковитою травичкою, а безсердні шаблезубі тигри тільки й дивились, як зʼїсти переможця тої борні – це я написав для прикладу, аби поколінню міленіалів було зрозуміліше. Для старшого сегменту й так ясно, що народився я в часи розквіту тричі клятого вошивого «совка», най би його шляки трафили. 

Тато військовий, мама вчителька – класика жанру. Родом вони з Вінничини, але завдяки циганській професії батька, що зобумовлювала постійні переїзди країною, народився я в Криму, звідки моє мале репетуюче тільце на першому році життя транспортували до Запоріжжя. Там затримались трохи довше, але не надто. Відповідно, дитячий садочок «Свєтлячок» гостинно розчинив переді мною двері в місті Улан-Батор, що на монгольщині. До 1986 року я там милувався сухоребрими коровами, які харчувались на смітниках й результативно ловив головою снігові кульки з камінням усередині – їх щедро насипали нам малолітні нащадки ЧінгізХана, з первинною відвертістю показуючи своє ставлення до незваних гостей – на лобі й досі маю доказ у вигляді шраму від тих часів. 

Потім доля зробила фінт вухами й моє пухкеньке тільце опинилось у львівській області, де й спокійнісінько собі розвивалося, займаючись спортом й треньканням на гітарі. Аж у 17 років (а це буремні девʼяності, прошу зауважити), вирішив наслідувати прикрий досвід батька. Відповідно, поступив до Одеського Інституту Сухопутних Військ, на аеромобільний факультет. 

Настрибався з парашутом, трохи постріляв й через чотири роки втрапив до вимріяної 80-ї аеромобільної бригади, що тоді знаходилась у місті Хирів. І там я все зрозумів. В першу чергу те, що достойно пожити армія мені не дасть. А радше, взагалі нічого не дасть – лише забере. Нерви, молодість і перспективи…ну є в мене таке – не мовчу, коли принижують. І бʼю у відповідь, коли мене бʼють. Тож, не дослуживши рік до закінчення контракту я назбирав побільше слини за щоки й плюнув на військо, глибоко розчарований. 

Наступні десять років працював тілоохоронцем, тобто бодіґардом. Теж не радісна робота, безперспективна. Та й гроші не як у Кевіна Костнера у славнозвісній стрічці. Вже не памʼятаю як до мого життя ввійшов фʼюзинг, але добре памʼятаю, як перехворівши на виразку кишків, пішов на війну влітку 2014-го року. Відвоював. Повернувся. Зажурився. Фʼюзинг мій не приніс нічого окрім загострення ПТСР. 

Поки здуру не придбав твір одного відомого журналіста про війноньку. Ніби «перша книга про війну й все таке бла-бла-бла». Не дочитав й до половини. Розізлився. Бо пан письменник анібіса не чохлив у військовій справі й взаємовідносинах у армії. До того ж самих лише консультантів він назбирав під двадцять штук. Я сів писати. І написав. Через півроку рукопис «Скепсис» був готовий. Намагався проштовхнути 2 його в якесь видавництво, натомість від мене відвертали пики. Тож почав видавати власним коштом. 

Невдовзі написав другу книгу, «Розірвані Ґердани». Але тут уже став хитріший, відкрив ФОП й почав друкуватись незалежно від будь-кого. Пізніше написав ще дві – «Провісники» та «Снище Маґури». Проте за певних обставин не встиг їх видати – почалася друга гаряча фаза війни. Що ж, вижив, повернувся. «Допилюю» дві крайні книги, працюю над наступною, «Парадокс мʼяса». Йде важко, «по живому». Але я не здаюся. Ніколи не здаюся. Й буду товкти цю стіну, допоки не пробʼю її. Або вона не розчавить мене.`,
        },
        isActive: true,
      },
    }),
  },
  {
    key: "checkout",
    admin_title: "Оформлення замовлення",
    title: "Оформлення замовлення",
    content: JSON.stringify({
      contact_data: {
        admin_title: "Контактні дані",
        name: {
          admin_title: "Поле вводу імені",
          type: "string",
          value: "Імʼя",
        },
        surname: {
          admin_title: "Поле вводу прізвища",
          type: "string",
          value: "Прізвище",
        },
        phone: {
          admin_title: "Поле вводу номеру телефону",
          type: "string",
          value: "Номер телефону",
        },
        email: {
          admin_title: "Поле вводу електронної пошти",
          type: "string",
          value: "Email",
        },
      },
      delivery_data: {
        admin_title: "Доставка",
        country: {
          admin_title: "Поле вводу країни",
          type: "string",
          value: "Країна",
        },
        delivery_type: {
          admin_title: "Поле вибору способу доставки",
          type: "string",
          value: "Спосіб доставки",
        },
        textarea: {
          admin_title: "Поле вводу адреси для доставок крім НП",
          type: "text",
          value: "Адреса",
        },
        area: {
          admin_title: "Поле вводу області",
          type: "string",
          value: "Область",
        },
        city: {
          admin_title: "Поле вводу міста",
          type: "string",
          value: "Місто",
        },
        street: {
          admin_title: "Поле вводу вулиці",
          type: "string",
          value: "Вулиця",
        },
        warehouse: {
          admin_title: "Поле вводу відділення",
          type: "string",
          value: "Відділення",
        },
        apartment: {
          admin_title: "Поле вводу номер квартири",
          type: "string",
          value: "Квартира",
        },
      },
      payment_data: {
        admin_title: "Оплата",
        title: {
          admin_title: "Заголовок",
          type: "string",
          value: "Спосіб оплати",
        },
        on_delivery: {
          admin_title: "Заголовок способу оплати при отриманні",
          type: "string",
          value: "Готівкою або картою: при отриманні",
        },
        online: {
          admin_title: "Заголовок способу оплати онлайн",
          type: "string",
          value: "WayForPay",
        },
      },
      cart: {
        admin_title: "Кошик",
        singular_cart_quantity: {
          admin_title: "Текст при 1 товарі в кошику",
          type: "string",
          value: "товар у кошику",
        },
        two_cart_quantity: {
          admin_title: "Текст при 2 товарах в кошику",
          type: "string",
          value: "товари у кошику",
        },
        plural: {
          admin_title: "Текст при більше ніж 2 товарах в кошику",
          type: "string",
          value: "товарів у кошику",
        },
        total: {
          admin_title: "Текст перед фінальною ціною",
          type: "string",
          value: "Разом до сплати",
        },
      },
      buttons: {
        admin_title: "Кнопки",
        confirm_checkout: {
          admin_title: "Текст кнопки підтвердження замовлення",
          type: "string",
          value: "Підтвердити замовлення",
        },
        continue_shopping: {
          admin_title: "Текст кнопки продовження покупки",
          type: "string",
          value: "Продовжити покупки",
        },
      },
    }),
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("bks_pages", pages);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("bks_pages", null, {});
  },
};
