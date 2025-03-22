<template>
  <div class="pt-[100px] lg:pt-[150px] text-center app-text-h2">
    {{ pageData?.title }}
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
          {{ pageData?.content?.contact_data?.admin_title }}
        </div>
        <div
          class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-x-24 gap-y-4 sm:gap-y-7 pt-10"
        >
          <AtomsAppInput
            v-model="formData.name"
            :label="pageData?.content?.contact_data?.name?.value"
            type="text"
            required
            :placeholder="pageData?.content?.contact_data?.name?.value"
            :error="errors.name"
          />
          <AtomsAppInput
            v-model="formData.surname"
            :label="pageData?.content?.contact_data?.surname?.value"
            type="text"
            :placeholder="pageData?.content?.contact_data?.surname?.value"
            :error="errors.surname"
          />
          <AtomsAppPhoneInput
            v-model="formData.phone"
            :label="pageData?.content?.contact_data?.phone?.value"
            type="tel"
            required
            :placeholder="pageData?.content?.contact_data?.phone?.value"
            :error="errors.phone"
          />
          <AtomsAppInput
            v-model="formData.email"
            :label="pageData?.content?.contact_data?.email?.value"
            type="email"
            required
            :placeholder="pageData?.content?.contact_data?.email?.value"
            :error="errors.email"
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
            1 {{ pageData?.content?.cart?.singular_cart_quantity }}
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
            {{ pageData?.content?.cart?.total }} 100$
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
          {{ pageData?.content?.delivery_data?.admin_title }}
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-24 gap-y-4 sm:gap-y-6 pt-10"
        >
          <AtomsAppSelect
            v-model="formData.country"
            :label="pageData?.content?.delivery_data?.country?.value"
            :options="countries"
            :placeholder="pageData?.content?.delivery_data?.country?.value"
            required
            :error="errors.country"
          />
          <AtomsAppSelect
            v-model="formData.city"
            :label="pageData?.content?.delivery_data?.city?.value"
            :options="cities"
            :placeholder="pageData?.content?.delivery_data?.city?.value"
            required
            :error="errors.city"
          />
          <AtomsAppSelect
            v-model="formData.delivery"
            :label="pageData?.content?.delivery_data?.delivery_type?.value"
            :options="deliveryTypes"
            class="sm:col-span-2"
            :placeholder="
              pageData?.content?.delivery_data?.delivery_type?.value
            "
            required
            :error="errors.delivery"
          />
        </div>
      </div>

      <!-- Підтвердити замовлення -->
      <div
        class="md:col-span-4 md:hidden order-3 md:order-none h-fit bg-[#E9E9E9] rounded-3.5xl p-4 sm:p-8"
      >
        <div class="flex flex-col justify-center items-center gap-4">
          <AtomsAppButton
            :value="pageData?.content?.buttons?.confirm_checkout?.value"
            color="black"
            @click="handleOrder"
          />
          <div class="text-center cursor-pointer hover:underline">
            {{ pageData?.content?.buttons?.continue_shopping?.value }}
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
          {{ pageData?.content?.payment_data?.title?.value }}
        </div>
        <div class="flex flex-col gap-2 sm:gap-4 pt-10">
          <AtomsAppRadioInput
            v-model="formData.payment"
            label="Apple pay"
            value="apple-pay"
            name="payment-method"
          />
          <AtomsAppRadioInput
            v-model="formData.payment"
            :label="pageData?.content?.payment_data?.on_delivery?.value"
            value="cash-on-delivery"
            name="payment-method"
          />
          <div v-if="errors.payment" class="text-red-500 text-sm">
            {{ errors.payment }}
          </div>
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
            1
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
            {{ pageData?.content?.cart?.total?.value }} 100$
          </div>
        </div>
      </div>
      <!-- Підтвердити замовлення -->
      <div
        class="md:col-span-4 order-3 md:order-none h-fit bg-[#E9E9E9] rounded-3.5xl p-4 sm:p-8"
      >
        <div class="flex flex-col justify-center items-center gap-4">
          <AtomsAppButton
            :value="pageData?.content?.buttons?.confirm_checkout?.value"
            color="black"
            @click="handleOrder"
          />
          <div
            class="text-center cursor-pointer hover:underline"
            @click="() => $router.push('/')"
          >
            {{ pageData?.content?.buttons?.continue_shopping?.value }}
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
const pageStore = usePageStore();
const { data: pageData } = await useAsyncData("pagesData", () => {
  return pageStore.fetchPageByKey("checkout");
});

const formData = reactive({
  name: "",
  surname: "",
  phone: "",
  email: "",
  country: "",
  city: "",
  delivery: "",
  payment: "",
});

const errors = reactive({});

const validateForm = () => {
  let isValid = true;

  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!formData.name) {
    errors.name = "Ім'я обов'язкове";
    isValid = false;
  } else if (formData.name.length < 2) {
    errors.name = "Ім'я має містити мінімум 2 символи";
    isValid = false;
  }

  if (!formData.surname) {
    errors.surname = "Прізвище обов'язкове";
    isValid = false;
  } else if (formData.surname.length < 2) {
    errors.name = "Прізвище має містити мінімум 2 символи";
    isValid = false;
  }

  if (!formData.phone) {
    errors.phone = "Телефон обов'язковий";
    isValid = false;
  } else if (!/^\+380\d{9}$/.test(formData.phone)) {
    errors.phone = "Невірний формат телефону. Приклад: +380xxxxxxxxx";
    isValid = false;
  }

  if (!formData.email) {
    errors.email = "Email обов'язковий";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Невірний формат email";
    isValid = false;
  }

  if (!formData.country) {
    errors.country = "Країна обов'язкова";
    isValid = false;
  }

  if (!formData.city) {
    errors.city = "Місто обов'язкове";
    isValid = false;
  }

  if (!formData.delivery) {
    errors.delivery = "Тип доставки обов'язковий";
    isValid = false;
  }

  if (!formData.payment) {
    errors.payment = "Спосіб оплати обов'язковий";
    isValid = false;
  }

  return isValid;
};

const handleOrder = () => {
  if (validateForm()) {
    console.log("Form submitted with values:", formData);
    showSuccessModal.value = true;
  }
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
.text-red-500 {
  position: absolute;
  bottom: 5px;
}
</style>
