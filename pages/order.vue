<template>
  <div class="pt-[100px] lg:pt-[150px] text-center app-text-h2">
    Оформлення замовлення
  </div>
  <div class="grid grid-cols-1 md:grid-cols-10 gap-4 px-4 pt-8 pb-24 xl:px-50">
    <!-- Контактні дані -->
    <div
      class="md:col-span-6 h-[470px] sm:h-[520px] bg-white rounded-3.5xl relative p-4 sm:p-6 md:py-12 md:pt-5"
    >
      <div class="absolute z-50 top-3 left-4 sm:left-6 app-text-block-heading">
        Контактні дані
      </div>
      <div class="grid grid-cols-1 gap-4 sm:gap-x-24 gap-y-4 sm:gap-y-7 pt-10">
        <AtomsAppInput
          v-model="name"
          label="Ім'я"
          type="text"
          required
          placeholder="Введіть ваше ім'я"
        />
        <AtomsAppInput
          v-model="surname"
          label="Прізвище"
          type="text"
          placeholder="Введіть ваше прізвище"
        />
        <AtomsAppInput
          v-model="phone"
          label="Номер телефону"
          type="number"
          placeholder="Введіть ваш номер телефону"
        />
        <AtomsAppInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="Введіть ваш email"
        />
      </div>
    </div>

    <!-- Кошик -->
    <div
      class="md:col-span-4 h-fit md:h-[520px] bg-white rounded-3.5xl relative p-4 sm:p-6 md:py-12 md:pt-5"
    >
      <div class="flex flex-col justify-between h-full">
        <div
          class="absolute z-50 top-3 left-4 pb-2 sm:left-6 bg-white w-[200px] app-text-block-heading"
        >
          1 товар у кошику
        </div>
        <div class="flex flex-col pt-12 gap-6 overflow-y-auto">
          <div
            class="flex gap-6 md:flex-col lg:flex-row md:items-center md:pb-4 md:border-b lg:border-none"
          >
            <img src="/images/book1.png" class="w-[80px] sm:w-[120px]" />
            <div class="flex w-full justify-between">
              <div>
                <div>Книга</div>
                <p>Автор</p>
                <br />
                100$
                <p class="text-[#ABE19D]">в наявності</p>
              </div>
              <p>1 шт.</p>
            </div>
          </div>
          <div
            class="flex gap-6 md:flex-col lg:flex-row md:items-center md:pb-4 md:border-b lg:border-none"
          >
            <img src="/images/book1.png" class="w-[80px] sm:w-[120px]" />
            <div class="flex w-full justify-between">
              <div>
                <div>Книга</div>
                <p>Автор</p>
                <br />
                100$
                <p class="text-[#ABE19D]">в наявності</p>
              </div>
              <p>1 шт.</p>
            </div>
          </div>
        </div>
        <div class="pt-4 md:pt-12">Разом до сплати 100$</div>
      </div>
    </div>

    <!-- Доставка -->
    <div
      class="md:col-span-6 h-[370px] sm:h-[300px] md:h-[270px] bg-white rounded-3.5xl relative p-4 sm:p-6 md:pt-5"
    >
      <div class="absolute z-50 top-3 left-4 sm:left-6 app-text-block-heading">
        Доставка
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-24 gap-y-4 sm:gap-y-6 pt-10"
      >
        <AtomsAppSelect v-model="country" label="Країна" :options="countries" />
        <AtomsAppSelect v-model="city" label="Місто" :options="cities" />
        <AtomsAppSelect
          v-model="delivery"
          label="Спосіб доставки"
          :options="deliveryTypes"
          class="sm:col-span-2"
        />
      </div>
    </div>

    <!-- Підтвердити замовлення -->
    <div class="md:col-span-4 h-fit bg-white rounded-3.5xl p-4 sm:p-8">
      <div class="flex flex-col justify-center items-center gap-4">
        <AtomsAppButton value="Підтвердити замовлення" color="green" />
        <div class="text-center cursor-pointer hover:underline">
          Продовжити покупки
        </div>
      </div>
    </div>

    <!-- Спосіб оплати -->
    <div
      class="md:col-span-6 h-[230px] bg-white rounded-3.5xl relative p-4 sm:p-6 md:pt-6"
    >
      <div class="absolute z-50 top-3 left-4 sm:left-6 app-text-block-heading">
        Спосіб оплати
      </div>
      <div class="flex flex-col gap-2 sm:gap-4 pt-10">
        <AtomsAppRadioInput
          v-model="payment"
          label="Apple pay"
          value="apple-pay"
          name="payment-method"
        />
        <AtomsAppRadioInput
          v-model="payment"
          label="Готівкою або картою: при отриманні"
          value="cash-on-delivery"
          name="payment-method"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const cities = ref([
  {
    label: "Київ",
    id: "kyiv",
  },
  {
    label: "Львів",
    id: "lviv",
  },
  {
    label: "Хмельницький",
    id: "khmelnytskyi",
  },
  {
    label: "Володимир",
    id: "volodymyr",
  },
  {
    label: "Вінниця",
    id: "vinnytsia",
  },
]);
const countries = ref([
  {
    label: "Україна",
    id: "ukraine",
  },
  {
    label: "Польща",
    id: "poland",
  },
  {
    label: "Німеччина",
    id: "germany",
  },
  {
    label: "Франція",
    id: "france",
  },
  {
    label: "Італія",
    id: "italy",
  },
]);
const deliveryTypes = ref([
  {
    label: "Нова пошта",
    id: "nova-poshta",
  },
  {
    label: "Укрпошта",
    id: "ukrposhta",
  },
]);
</script>
