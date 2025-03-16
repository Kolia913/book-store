<template>
  <div class="modal">
    <div class="modal__bck z-1" @click="close" />
    <div class="modal__block py-5 px-7 rounded z-2">
      <h2 class="dark:text-slate-800 text-xl pb-3">Rename file</h2>
      <span class="modal__close" @click="close" />
      <div class="form white mb-5" style="min-width: 300px">
        <label>
          <input
            type="text"
            v-model="fileName"
            class="py-1.5 px-1"
            style="
              color: black;
              border: 1px solid rgb(200, 200, 200);
              width: 100%;
              border-radius: 3px;
            "
          />
        </label>
      </div>
      <div class="flex items-center justify-center mb-5">
        <div class="text-base h-fit relative rounded-lg border z-0 mr-5">
          <AppButton text="Cancel" variant="danger" class="hidden sm:flex" @click="() => close()" />
        </div>
        <div class="text-base h-fit relative rounded-lg border z-0">
          <AppButton
            text="Rename"
            variant="success"
            class="hidden sm:flex"
            @click="() => saveRename()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import useFilemanagerStore from '@/stores/filemanager';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

const $emit = defineEmits(['close', 'successRename']);

const useFilemanager = useFilemanagerStore();

const props = defineProps(['choiceFile']);

const fileName = ref('');

const disk = computed(() => useFilemanager.disk);

onMounted(() => {
  fileName.value = props.choiceFile.basename;
  console.log(props.choiceFile);
});

const saveRename = () => {
  const payload = {
    disk: disk.value,
    type: props.choiceFile?.type || 'file',
    oldName: props.choiceFile.dirname + '/' + props.choiceFile.basename,
    newName: props.choiceFile.dirname + '/' + fileName.value,
  };
  useFilemanager.renameFile(payload).then(() => {
    $emit('successRename');
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
