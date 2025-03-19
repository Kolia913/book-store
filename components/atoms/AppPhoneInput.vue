<template>
  <div class="space-y-1">
    <label class="block text-md mb-1">
      {{ label }}
      <span class="text-red-500">*</span>
    </label>
    <div class="w-full border flex border-[#b4b4b4] bg-white px-3 rounded-xl">
      <v-select
        :options="phoneCodes"
        v-model="selectedCode"
        :reduce="(country) => country.code"
        :get-option-label="(country) => country.code"
        :clearable="false"
        :searchable="false"
        class="input w-full border-r border-[#b4b4b4] bg-white py-3 mr-3 focus:outline-none focus:ring-2 focus:border-transparent max-w-[100px] text-center"
      >
        <template #option="{ country, icon }">
          <div class="flex gap-2">
            <component :is="icon" class="w-8"></component>{{ country }}
          </div>
        </template>
      </v-select>
      <input
        type="tel"
        v-model="model"
        :placeholder="placeholder"
        class="focus:outline-none py-4 focus:border-transparent w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { IconsIconGermanFlag } from "#components";
import IconsIconSlavaUkraine from "../icons/IconSlavaUkraine";
defineProps(["label", "placeholder"]);

const model = defineModel();

const phoneCodes = ref([
  {
    id: 1,
    country: "Ukraine",
    code: "+380",
    icon: IconsIconSlavaUkraine,
  },
  {
    id: 2,
    country: "Germany",
    code: "+49",
    icon: IconsIconGermanFlag,
  },
]);
const selectedCode = ref(phoneCodes.value[0]);
</script>
