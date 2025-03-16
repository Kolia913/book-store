<template>
  <div class="main">
    <div class="dropzone-container" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".jpg,.jpeg,.webp,.png,.pdf,.doc,.docx,.xls,.xlsx,.svg,.zip,.rar"
      />

      <label for="fileInput" class="file-label">
        <div class="text-gray-600" v-if="isDragging">Release to drop files here.</div>
        <div class="text-gray-600" v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
    </div>
    <div class="preview" v-if="fileUrlList.length">
      <div class="preview__list relative z-10 text-gray-600">
        <template v-for="(imgUrl, imgIndex) in fileUrlList" :key="'imgIndex-' + imgIndex">
          <div class="preview__item">
            <div class="preview__item-remove" @click="() => removeFile(imgIndex)"></div>
            <img :src="imgUrl" alt="preview-img" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const $emit = defineEmits(['uploadFiles']);
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const $toast = useToast();

const isDragging = ref(false);
const file = ref(null);
const files = ref([]);
const fileUrlList = ref([]);
const formatList = ref([
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/pdf',
  'image/jpeg',
  'image/webp',
  'image/png',
  'image/svg+xml',
  'application/zip',
  'application/x-zip-compressed',
  'application/x-rar',
]);

function onChange() {
  const filesList = file.value.files;
  Object.keys(filesList).map((fileItem) => {
    if (validFile(filesList[fileItem])) {
      files.value.push(filesList[fileItem]);
      fileUrlList.value.push(URL.createObjectURL(filesList[fileItem]));
    }
  });
  $emit('uploadFiles', files.value);
}
const validFile = (fileItem) => {
  if (formatList.value.includes(JSON.stringify(fileItem.type))) {
    $toast.error(`This file format - ${fileItem.type} not supported`);
  } else if (fileItem.size > 5000000) {
    $toast.error('File can`t be more 5mb');
  } else {
    return true;
  }
};
const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
};
const dragleave = () => {
  isDragging.value = false;
};

const drop = (e) => {
  e.preventDefault();
  file.value.files = e.dataTransfer.files;
  onChange();
  isDragging.value = false;
};

const removeFile = (index) => {
  fileUrlList.value.splice(index, 1);
  files.value.splice(index, 1);
  $emit('uploadFiles', this.files);
};
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  max-width: 100%;
}

.dropzone-container {
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
.preview {
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 106px;
  max-width: 100%;
  &__list {
    display: flex;
    width: 100%;
  }
  &__item {
    padding: 10px;
    margin: 3px;
    box-sizing: border-box;
    height: 100px;
    width: 100px;
    min-width: 100px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  }
  &__item-remove {
    position: absolute;
    right: 0;
    top: 0;
    height: 20px;
    width: 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background: white;
    cursor: pointer;
    border-radius: 5px;
    &::after,
    &::before {
      content: '';
      position: absolute;
      height: 15px;
      width: 2px;
      background-color: red;
      left: 9px;
      top: 2.5px;
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg);
    }
  }
}
</style>
