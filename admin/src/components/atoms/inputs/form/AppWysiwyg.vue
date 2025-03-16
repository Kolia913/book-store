<template>
  <div>
    <span 
      v-if="label" 
      class="text-gray-600 dark:text-gray-400 block mb-2 text-sm"
    >{{ label }}</span>
    <div class="rounded-lg overflow-hidden">
      <editor
        height="500"
        v-model="value"
        :disabled="readonly ? readonly : false"
        :readonly="readonly ? readonly : false"
        class="w-full h-full"
        :api-key="wysiwygCode"
        :init="{
          plugins: 'lists link image emoticons table code media anchor wordcount nonbreaking',
          toolbar:
            'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image table anchor | code media wordcount nonbreaking quickbars',
        }"
        :a11y_advanced_options="true"
        :resize_img_proportional="true"
        :style_formats="[
          {
            title: 'Image Left',
            selector: 'img',
            styles: {
              float: 'left',
              margin: '50px',
            },
          },
          {
            title: 'Image Right',
            selector: 'img',
            styles: {
              float: 'right',
              margin: '50px',
            },
          },
        ]"
      />
      <button
        v-if="!readonly"
        class="w-full border border-slate-700 bg-slate-700 text-slate-100 rounded text-sm py-0."
        @click="choiceNewImg()"
        type="button"
      >
        Choose img
      </button>
      <ModalFilemanager
        v-if="toggleShowFileManager"
        @close="() => (toggleShowFileManager = false)"
        :modalStatus="true"
      />
    </div>
  </div>
</template>
<script setup>
import ModalFilemanager from '@/components/partials/FileManager/ModalFilemanager.vue';
import { ref, defineModel, onBeforeMount } from 'vue';
import Editor from '@tinymce/tinymce-vue';

defineProps(['label', 'readonly']);

const wysiwygCode = ref('');

onBeforeMount(() => { 
    wysiwygCode.value = localStorage.getItem('wysiwyg_api_key')?.length ? localStorage.getItem('wysiwyg_api_key') : "1ox598xe1kodulc0yj8a1tzqkwm7mca1sms022pdgd9fyc3l";
})
const value = defineModel();

const toggleShowFileManager = ref(false);

const choiceNewImg = () => {
  toggleShowFileManager.value = true;
};
</script>
