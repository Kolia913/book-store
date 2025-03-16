<template>
  <div class="modal">
    <div class="modal__bck z-1" @click="close" />
    <div class="modal__block py-5 px-7 rounded z-2">
      <h2 class="dark:text-slate-800 text-xl pb-3">Load files in directory: {{ props.dirName }}</h2>
      <span class="modal__close" @click="close" />
      <div class="import-files mb-5" @drop.prevent="handleDrop">
        <!-- <span>Drop your files here</span>
        <input multiple type="file" accept="image/jpeg, image/jpg"  /> -->

        <DropFile @uploadFiles="(e) => uploadLocalFiles(e)" />
      </div>
      <div class="mb-5">
        <AppToggleInput
          :disabledText="'Skip'"
          :enabledText="'Overwrite'"
          :blackTheme="true"
          v-model="overwrite"
        />
      </div>
      <div class="flex justify-center mb-2">
        <AppButton
          text="Send Files"
          variant="success"
          class="hidden sm:flex"
          @click="() => sendFiles()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import useFilemanagerStore from '@/stores/filemanager';
import DropFile from './DropFile.vue';
import AppToggleInput from '@/components/atoms/inputs/form/AppToggleInput.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

const useFilemanager = useFilemanagerStore();

const $emit = defineEmits(['close', 'successUpload']);

const events = ['dragenter', 'dragleave', 'dragover', 'drop'];

const props = defineProps(['dirName']);

const overwrite = ref(false);
const files = ref(null);

const disk = computed(() => useFilemanager.disk);

onMounted(() => {
  events.forEach((event) => document.body.addEventListener(event, (e) => e.preventDefault()));
});

onUnmounted(() => {
  events.forEach((event) => document.body.removeEventListener(event, (e) => e.preventDefault()));
});

const uploadLocalFiles = (e) => {
  files.value = e;
};

const sendFiles = () => {
  const payload = {
    disk: disk.value,
    path: props.dirName,
    overwrite: Number(overwrite.value),
    files: Object.values(files.value),
  };
  useFilemanager.uploadFile(payload).then(() => {
    $emit('successUpload');
  });
};
const close = () => {
  $emit('close');
};
</script>

<style lang="scss" scoped>
.import-files {
  position: relative;
  height: 300px;
  width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
  span {
    position: relative;
    z-index: 1;
    color: black;
    text-align: center;
    pointer-events: none;
  }
}
</style>
