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
            {{ cartForOrder?.length }}
            {{ pageData?.content?.cart?.singular_cart_quantity.value }}
          </div>
          <div class="flex flex-col pt-12 gap-6 overflow-y-auto">
            <div
              v-for="item in cartForOrder"
              :key="item.id"
              class="flex gap-6 md:flex-col lg:flex-row md:items-center md:pb-4 md:border-b lg:border-none"
            >
              <img :src="item.image" class="w-[80px] sm:w-[120px]" />
              <div class="flex w-full justify-between">
                <div>
                  <div class="app-text-body uppercase">{{ item.title }}</div>
                  <p>Автор</p>
                  <br />
                  {{ item.cost / item.quantity }} ₴
                  <p class="text-[#ABE19D]">в наявності</p>
                </div>
                <p>{{ item.quantity }} шт.</p>
              </div>
            </div>
          </div>
          <div class="pt-4 md:pt-0 app-text-block-heading">
            {{ pageData?.content?.cart?.total.value }} {{ total }}₴
          </div>
        </div>
      </div>

      <!-- Доставка -->
      <div
        class="md:col-span-6 order-2 md:order-none md:h-fit bg-[#E9E9E9] rounded-3.5xl relative p-4 sm:p-6 md:pt-5"
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
            labelKey="label"
            valueKey="label"
            :placeholder="pageData?.content?.delivery_data?.country?.value"
            required
            :error="errors.country"
          />
          <AtomsAppSelect
            v-model="formData.city"
            :label="pageData?.content?.delivery_data?.city?.value"
            labelKey="Present"
            valueKey="Present"
            :options="cities"
            :placeholder="pageData?.content?.delivery_data?.city?.value"
            required
            :error="errors.city"
            :class="{ 'pointer-events-none opacity-50': !formData.country }"
            @search="fetchCities"
            @change="handleCitySelect($event)"
          />
          <AtomsAppSelect
            v-model="formData.delivery"
            :label="pageData?.content?.delivery_data?.delivery_type?.value"
            labelKey="label"
            valueKey="label"
            :options="deliveryTypes"
            :searchable="false"
            class="sm:col-span-2"
            :class="{
              'pointer-events-none opacity-50':
                !formData.city || !formData.country,
            }"
            :placeholder="
              pageData?.content?.delivery_data?.delivery_type?.value
            "
            required
            :error="errors.delivery"
          />
          <AtomsAppSelect
            v-if="
              formData.delivery === 'Нова пошта' &&
              formData.city &&
              formData.country
            "
            v-model="formData.warehouse"
            label="Виберіть відділеня/поштомат"
            labelKey="Description"
            valueKey="Description"
            :options="warehouses"
            class="sm:col-span-2"
            :class="{ 'pointer-events-none opacity-50': !formData.delivery }"
            placeholder="Відділеня/Поштомат"
            required
            :error="errors.warehouse"
            @search="fetchWarehouses(settlementRef, $event)"
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
            label="Онлайн оплата"
            value="Онлайн оплата"
            name="payment-method"
          />
          <AtomsAppRadioInput
            v-model="formData.payment"
            :label="pageData?.content?.payment_data?.on_delivery?.value"
            value="Готівкою при отриманні"
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
            {{ cartForOrder?.length }}
            {{ pageData?.content?.cart?.singular_cart_quantity.value }}
          </div>
          <div class="flex flex-col pt-12 gap-4 overflow-y-auto">
            <div
              v-for="item in cartForOrder"
              :key="item.id"
              class="flex gap-4 md:flex-col lg:flex-row md:items-start md:pb-4 md:border-b lg:border-none"
            >
              <img :src="item.image" class="w-[80px] sm:w-[120px]" />
              <div class="flex w-full justify-between">
                <div>
                  <div class="uppercase">{{ item.title }}</div>
                  <p>Автор</p>
                  <br />
                  {{ item.cost / item.quantity }} ₴
                  <p class="text-[#ABE19D]">в наявності</p>
                </div>
                <p>{{ item.quantity }} шт.</p>
              </div>
            </div>
          </div>
          <div class="pt-4 md:pt-0 app-text-block-heading">
            {{ pageData?.content?.cart?.total?.value }} {{ total }}₴
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
const cities = ref([]);
const warehouses = ref([]);
const npStore = useNPStore();

const { data: pageData } = await useAsyncData("pagesData", () => {
  return pageStore.fetchPageByKey("checkout");
});
const { $toast } = useNuxtApp();
const cartForOrder = ref([]);

onMounted(() => {
  const cartData = localStorage.getItem("cartForOrder");
  if (cartData) {
    cartForOrder.value = JSON.parse(cartData);
  }
});

const total = computed(() => {
  return cartForOrder.value.reduce((sum, item) => sum + item.cost, 0);
});
const settlementRef = ref("");
const formData = reactive({
  name: "",
  surname: "",
  phone: "",
  email: "",
  country: "",
  city: "",
  delivery: "",
  warehouse: "",
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
    errors.surname = "Прізвище має містити мінімум 2 символи";
    isValid = false;
  }

  if (!formData.phone) {
    errors.phone = "Телефон обов'язковий";
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

  if (formData.delivery === "Нова пошта" && !formData.warehouse) {
    errors.warehouse = "Відділення/Поштомат обов'язковий";
    isValid = false;
  }

  return isValid;
};

const handleCitySelect = (selectedCityLabel) => {
  if (!selectedCityLabel) return;

  const selectedCity = cities.value.find(
    (city) => city.Present === selectedCityLabel
  );
  if (selectedCity) {
    settlementRef.value = selectedCity.Ref;
    fetchWarehouses(settlementRef.value, "");
  }
};

const fetchCities = async (query) => {
  if (query.length < 2) return;
  try {
    const response = await npStore.fetchSettlements(query);
    if (
      response?.success &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      cities.value = response.data[0].Addresses.map((city) => ({
        Present: city.Present,
        Ref: city.Ref,
      }));
    } else {
      cities.value = [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    cities.value = [];
  }
};

const fetchWarehouses = async (settlementRef, query) => {
  try {
    const response = await npStore.fetchWarehouses(settlementRef, query);
    if (
      response?.success &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      warehouses.value = response.data.map((warehouse) => ({
        Description: warehouse.Description,
      }));
    } else {
      warehouses.value = [];
    }
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    warehouses.value = [];
  }
};
const handleOrder = async () => {
  if (!validateForm()) {
    $toast.warning("Заповніть всі обов'язкові поля");
    return;
  }

  try {
    const customerResponse = await $fetch("/api/customers", {
      method: "POST",
      body: {
        phone: formData.phone,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
      },
    });

    if (!customerResponse?.customer?.id) {
      throw new Error("Некоректна відповідь від сервера при створенні клієнта");
    }

    const customerId = customerResponse.customer.id;
    const orderReference = `ORDER_${Date.now()}`;

    if (formData.payment === "Онлайн оплата") {
      const paymentResponse = await $fetch("/api/wayforpay/init", {
        method: "POST",
        body: {
          orderReference,
          amount: total.value,
          cartItems: cartForOrder.value,
          clientEmail: formData.email,
          clientFirstName: formData.name,
          clientLastName: formData.surname,
          clientPhone: formData.phone,
        },
      });

      if (!paymentResponse?.widgetData) {
        throw new Error("Не вдалося ініціалізувати платіж");
      }

      const { $wayforpay } = useNuxtApp();
      const wayforpay = await $wayforpay.load();

      wayforpay.run(
        paymentResponse.widgetData,
        (response) => {
          console.log("Payment approved:", response);
          handlePaymentSuccess(response, {
            customerId,
            orderReference,
            paymentType: formData.payment,
          });
        },
        (response) => {
          console.log("Payment declined:", response);
          $toast.error(
            "Платіж не пройшов. Спробуйте ще раз або оберіть інший спосіб оплати"
          );
        },
        (response) => {
          console.log("Payment pending:", response);
          $toast.info("Платіж обробляється. Будь ласка, зачекайте");
        }
      );
    } else if (formData.payment === "Готівкою при отриманні") {
      await createOrder(customerId, orderReference, formData.payment);
      showSuccessModal.value = true;
      localStorage.removeItem("cartForOrder");
      cartForOrder.value = [];
    }
  } catch (error) {
    console.error("Order processing error:", error);
    const errorMessage =
      error.data?.message || error.message || "Сталася невідома помилка";
    $toast.error(`Помилка: ${errorMessage}`);
  }
};

const createOrder = async (customerId, orderReference, paymentType) => {
  const purchaseResponse = await $fetch("/api/purchases", {
    method: "POST",
    body: {
      payment_type: paymentType,
      customer_id: customerId,
      customer_data: {
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone,
        email: formData.email,
      },
      cart_data: cartForOrder.value.map((item) => ({
        book_id: item.id,
        qty: item.quantity,
        price: item.price,
      })),
      total: total.value,
      delivery_data: {
        country: formData.country,
        city: formData.city,
        type: formData.delivery,
        warehouse: formData.warehouse,
      },
      payment_status: paymentType === "Онлайн оплата" ? "completed" : "pending",
      wayforpay_reference: orderReference,
    },
  });

  if (!purchaseResponse) {
    throw new Error("Не вдалося створити замовлення");
  }
  return purchaseResponse;
};

const handlePaymentSuccess = async (response, orderData) => {
  try {
    await createOrder(
      orderData.customerId,
      orderData.orderReference,
      orderData.paymentType
    );

    await $fetch("/api/purchases/update-status", {
      method: "PATCH",
      body: {
        orderReference: response.orderReference,
        status: "completed",
      },
    });

    showSuccessModal.value = true;
    localStorage.removeItem("cartForOrder");
    cartForOrder.value = [];
    localStorage.removeItem("cart");
  } catch (err) {
    console.error("Failed to create/update order:", err);
    $toast.error(
      "Платіж пройшов успішно, але виникла помилка при створенні замовлення"
    );
  }
};

watch(showSuccessModal, (newVal) => {
  if (newVal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
watch(
  () => formData.city,
  (newVal) => {
    handleCitySelect(newVal);
  }
);

watch(settlementRef, (newVal) => {
  npStore.fetchWarehouses(newVal, "");
});

watch(
  () => formData.city,
  (newCity) => {
    if (newCity) {
      npStore.fetchSettlements(newCity);
      formData.warehouse = "";
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});

const countries = ref([
  { label: "Україна", id: "ukraine" },
  // { label: "Польща", id: "poland" },
]);
const deliveryTypes = ref([
  { label: "Нова пошта", id: "nova-poshta" },
  // { label: "Укрпошта", id: "ukrposhta" },
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
