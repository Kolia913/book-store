<template>
  <div class="pt-[100px] lg:pt-[150px] text-center app-text-h2">
    Оформлення замовлення
  </div>
  <div
    class="grid grid-cols-1 md:grid-cols-10 md:flex gap-4 px-4 pt-8 pb-24 xl:px-20 2xl:px-50"
  >
    <div class="md:w-[70%] flex flex-col gap-4">
      <!-- Контактні дані -->
      <div
        class="md:col-span-6 order-2 md:order-none h-[470px] sm:h-[520px] xl:h-[300px] bg-[#E9E9E9] rounded-3.5xl relative p-4 sm:p-6 md:py-12 md:pt-5"
      >
        <div
          class="absolute z-50 top-3 left-4 sm:left-6 app-text-block-heading"
        >
          Контактні дані
        </div>
        <div
          class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-x-24 gap-y-4 sm:gap-y-7 pt-10"
        >
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
          <AtomsAppPhoneInput
            v-model="phone"
            label="Номер телефону"
            type="tel"
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
        class="md:col-span-4 md:hidden order-1 md:order-none h-fit bg-[#E9E9E9] rounded-3.5xl relative p-4 sm:p-6 md:py-4 md:pt-5"
      >
        <div class="flex flex-col justify-between h-full">
          <div
            class="absolute z-50 top-3 left-4 pb-2 sm:left-6 bg-[#E9E9E9] w-[200px] app-text-block-heading"
          >
            1 товар у кошику
          </div>
          <div class="flex flex-col pt-12 gap-6 overflow-y-auto">
            <div
              class="flex gap-6 md:flex-col lg:flex-row md:items-center md:pb-4 md:border-b lg:border-none"
            >
              <img src="/uploads/book1.png" class="w-[80px] sm:w-[120px]" />
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
              <img src="/uploads/book1.png" class="w-[80px] sm:w-[120px]" />
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
          <div class="pt-4 md:pt-0 app-text-block-heading">
            Разом до сплати 100$
          </div>
        </div>
      </div>

      <!-- Доставка -->
      <div
        class="md:col-span-6 h-[370px] order-2 md:order-none sm:h-[300px] md:h-[280px] bg-[#E9E9E9] rounded-3.5xl relative p-4 sm:p-6 md:pt-5"
      >
        <div
          class="absolute z-50 top-3 left-4 sm:left-6 app-text-block-heading"
        >
          Доставка
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-24 gap-y-4 sm:gap-y-6 pt-10"
        >
          <AtomsAppSelect
            v-model="country"
            label="Країна"
            :options="countries"
            placeholder="Введіть вашу країну"
          />
          <AtomsAppSelect
            v-model="city"
            label="Місто"
            :options="cities"
            placeholder="Введіть ваше місто"
          />
          <AtomsAppSelect
            v-model="delivery"
            label="Спосіб доставки"
            :options="deliveryTypes"
            class="sm:col-span-2"
            placeholder="Введіть тип доставки"
          />
        </div>
      </div>

      <!-- Підтвердити замовлення -->
      <div
        class="md:col-span-4 md:hidden order-3 md:order-none h-fit bg-[#E9E9E9] rounded-3.5xl p-4 sm:p-8"
      >
        <div class="flex flex-col justify-center items-center gap-4">
          <AtomsAppButton value="Підтвердити замовлення" color="black" />
          <div class="text-center cursor-pointer hover:underline">
            Продовжити покупки
          </div>
        </div>
      </div>

      <!-- Спосіб оплати -->
      <div
        class="md:col-span-6 order-2 md:order-none h-[230px] bg-[#E9E9E9] rounded-3.5xl relative p-4 sm:p-6 md:pt-6"
      >
        <div
          class="absolute z-50 top-3 left-4 sm:left-6 app-text-block-heading"
        >
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
    <div class="hidden md:w-[30%] md:flex flex-col gap-4">
      <div
        class="md:col-span-4 order-1 md:order-none h-fit bg-[#E9E9E9] rounded-3.5xl relative p-4 sm:p-6 md:py-4 md:pt-5"
      >
        <div class="flex flex-col justify-between h-full">
          <div
            class="absolute z-50 top-3 left-4 pb-2 sm:left-6 bg-[#E9E9E9] w-[200px] app-text-block-heading"
          >
            1 товар у кошику
          </div>
          <div class="flex flex-col pt-12 gap-6 overflow-y-auto">
            <div
              class="flex gap-6 md:flex-col lg:flex-row md:items-center md:pb-4 md:border-b lg:border-none"
            >
              <img src="/uploads/book1.png" class="w-[80px] sm:w-[120px]" />
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
              <img src="/uploads/book1.png" class="w-[80px] sm:w-[120px]" />
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
          <div class="pt-4 md:pt-0 app-text-block-heading">
            Разом до сплати 100$
          </div>
        </div>
      </div>
      <!-- Підтвердити замовлення -->
      <div
        class="md:col-span-4 order-3 md:order-none h-fit bg-[#E9E9E9] rounded-3.5xl p-4 sm:p-8"
      >
        <div class="flex flex-col justify-center items-center gap-4">
          <AtomsAppButton
            value="Підтвердити замовлення"
            color="black"
            @click="handleOrder"
          />
          <div
            class="text-center cursor-pointer hover:underline"
            @click="() => $router.push('/')"
          >
            Продовжити покупки
          </div>
        </div>
      </div>
    </div>
  </div>
  <Transition>
    <ModalsSuccessModal v-if="showSuccessModal" />
  </Transition>
</template>

<script setup>
const showSuccessModal = ref(false);
const handleOrder = () => {
  showSuccessModal.value = true;
};

watch(showSuccessModal, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});

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

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

div {
  font-family: Inter;
  font-weight: 600;
}
</style>
