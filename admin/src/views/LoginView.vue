<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <AppCard class="px-6 py-4">
      <page-title text="Вхід" class="text-center" />
      <form
        @submit.prevent="submitLoginCredentails"
        class="pt-4 flex flex-col justify-start items-center gap-4"
      >
        <div class="flex flex-col justify-start items-start gap-1">
          <label>Ім'я</label>
          <AppPlainInput class="w-[268px]" v-model="username" />
        </div>
        <div class="flex flex-col justify-start items-start gap-1">
          <label>Пароль</label>
          <AppPlainInput class="w-[268px]" v-model="password" type="password" />
        </div>
        <div class="pt-2">
          <AppButton variant="primary" text="Увійти" class="w-32" type="submit" />
        </div>
      </form>
    </AppCard>
  </div>
</template>
<script setup>
import AppCard from '@/components/general/AppCard.vue';
import AppPlainInput from '@/components/atoms/inputs/form/AppPlainInput.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import useAuthStore from '@/stores/auth';

import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');

function submitLoginCredentails() {
  if (!username.value.length || !password.value.length) {
    return;
  }
  const credentials = {
    username: username.value,
    password: password.value,
  };

  authStore.login(credentials).then(() => {
    router.push('/');
  });
}
</script>
