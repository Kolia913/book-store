<template>
    <div>
      <transition name="fade">
        <div
          class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-30"
          @click="closeOptions"
          v-if="isOptionsOpen"
        ></div>
      </transition>
      <transition name="slide">
        <div
          v-if="isOptionsOpen"
          class="fixed right-0 top-0 bottom-0 w-full bg-white dark:bg-grey-dark-100 max-w-md z-40 pt-7"
        >
            <div class="absolute top-7 right-7 cursor-pointer" @click="closeOptions">
            <CloseIcon class="w-5 h-5" />
            </div> 
            <div class="w-full flex flex-col justify-start items-center gap-5">
                <div
                class="w-12 h-12 flex justify-center items-center bg-grey-100 dark:bg-grey-dark-50 rounded-full"
                >
                    <v-icon
                        name="bi-gear"
                        :scale="1.3"
                        :color="isActive ? (isDarkTheme ? '#FBBF24' : '#D97707') : 'rgb(234, 228, 228);'" 
                    /> 
                </div> 
            </div>
            <div class="w-full px-10 mb-5">
                <AppPlainInput v-model="logsLink" type="text" label="Logs лінк" />
            </div>
            <div class="w-full px-10 mb-5">
                <AppPlainInput v-model="wysiwygCode" type="text" label="Wysiwyg код" />
            </div>
            <div class="flex justify-center">
                <AppButton @click="onSubmit" type="submit" variant="primary" text="Зберегти" />
            </div>
        </div>
      </transition>
    </div>
  </template>
  <script setup>
    import CloseIcon from '@/components/icons/CloseIcon.vue'; 
    import AppPlainInput from '@/components/atoms/inputs/form/AppPlainInput.vue';
    import AppButton from '@/components/atoms/buttons/AppButton.vue';
    import { ref, onBeforeMount } from 'vue';
    import { useToast } from 'vue-toastification';
    
    

    defineProps(['isOptionsOpen']);
    
    const $toast = useToast();
    const emit = defineEmits(['onClose']);

    const logsLink = ref('');
    const wysiwygCode = ref('');
    
    onBeforeMount(() => {
        logsLink.value = localStorage.getItem('logsLink') ? localStorage.getItem('logsLink') : "";
        wysiwygCode.value = localStorage.getItem('wysiwyg_api_key') ? localStorage.getItem('wysiwyg_api_key') : "";
    })

    function closeOptions() {
        emit('onClose');
    }

    function onSubmit() { 
        localStorage.setItem('logsLink', logsLink.value)
        localStorage.setItem('wysiwyg_api_key', wysiwygCode.value)
        $toast.success('Налаштування успішно оновлені');
    }
    </script>

    <style lang="scss" scoped>
    .slide-leave-active,
    .slide-enter-active {
        transition: 0.2s;
    }
    .slide-enter-from {
        transform: translate(448px, 0);
    }
    .slide-leave-to {
        transform: translate(448px, 0);
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        color: rgb(234, 228, 228);
    }
  </style>
  