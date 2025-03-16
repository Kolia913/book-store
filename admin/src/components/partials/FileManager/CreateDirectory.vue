<template>
  <div class="modal">
    <div class="modal__bck" @click="() => $emit('close')" />
    <div class="modal__block">
      <div class="modal__close" @click="() => $emit('close')" />
      <div class="create-directory p-5">
        <div class="form white">
          <label class="py-5">
            <span>Directory name</span>
            <input
              class="dark:text-slate-800 border border-slate-500 radius"
              type="text"
              v-model="directoryName"
            />
          </label>
          <div class="flex items-center justify-center">
            <AppButton
              text="Create Directory"
              variant="success"
              class="hidden sm:flex"
              @click="() => $emit('createDirectory', directoryName)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

const $emit = defineEmits(['createDirectory', 'close']);

const directoryName = ref('');
</script>
<style scoped lang="scss">
.form {
  padding: 25px;
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  &__child {
    padding: 15px;
  }
  &__child-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #322e2e;
    label {
      padding: 0 15px;
    }
  }
  @media screen and (max-width: 992px) {
    padding: 15px;
  }
  label {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-bottom: 15px;
    @media screen and (max-width: 740px) {
      max-width: 100%;
      width: 100%;
    }
    & > span {
      font-size: 14px;
      margin-bottom: 5px;
      color: #000;
    }
    textarea,
    input {
      border-radius: 3px;
      padding: 7px 10px;
      border: 1px solid rgb(200, 200, 200);
      font-size: 14px;
      &.error {
        border-color: #eb3737;
      }
    }
    img {
      margin: 15px 0;
      max-height: 150px;
      max-width: 150px;
      object-fit: contain;
    }
  }
  .value-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 25px;
    border-radius: 5px;
    border: 1px solid rgb(200, 200, 200);
    margin: 25px 0;
    label {
      width: 100%;
    }
    @media screen and (max-width: 740px) {
      flex-direction: column;
    }
  }
}
</style>
