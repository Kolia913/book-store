<template>
  <label>
    <div class="flex w-full">
      <div class="flex justify-start items-end gap-2 w-full">
        <AppPlainInput type="text" v-model="model" :label="label" class="w-full" />
        <AppButton
          text="choose img"
          type="button"
          variant="outline"
          @onClick="choiceNewImg()"
          class="min-w-[100px]"
        />
      </div>
      <ModalFilemanager
        v-if="toggleShowFileManager"
        @close="() => (toggleShowFileManager = false)"
        @sendPath="(e) => getPath(e)"
        :modalStatus="true"
      />
    </div>
    <img v-if="model" :src="config.baseStorage + model" class="max-w-40 mt-2" />
  </label>
</template>
<script setup>
import useAppConfig from '@/core/composables/useAppConfig';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import ModalFilemanager from '@/components/partials/FileManager/ModalFilemanager.vue';
import { ref, defineModel } from 'vue';
import AppPlainInput from './AppPlainInput.vue';

const config = useAppConfig();

defineProps(['label']);

const model = defineModel();

const toggleShowFileManager = ref(false);

const choiceNewImg = () => {
  toggleShowFileManager.value = true;
};
const getPath = (e) => {
  model.value = e;
};
</script>
