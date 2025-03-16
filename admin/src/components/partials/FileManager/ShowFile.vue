<template>
  <div class="modal">
    <div class="modal__bck" @click="$emit('close')" />
    <div class="modal__block">
      <div class="modal__close" @click="$emit('close')" />
      <div class="show-image" v-if="props.imgItem">
        <img :src="Config.baseStorage + props.imgItem.path" alt="open-img" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Config from '../../../core/_internal/Config';

const props = defineProps(['imgItem']);
const $emit = defineEmits(['close']);
</script>
<style scoped lang="scss">
.show-image {
  max-height: 90vh;
  max-width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  img {
    max-height: 90vh;
    max-width: 80%;
  }
}
</style>
