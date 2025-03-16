<template>
  <div class="modal">
    <div class="modal__bck" @click="$emit('close')" />
    <div class="modal__block rounded">
      <div class="modal__close" @click="$emit('close')" />
      <div class="show-info" v-if="props.imgItem">
        <h2>file info</h2>
        <ul>
          <li>
            <p class="text-gray-700">Basename:</p>
            <span class="text-gray-500 text-sm">{{ props.imgItem.basename }}</span>
          </li>
          <li>
            <p class="text-gray-700">dirname:</p>
            <span class="text-gray-500 text-sm">{{ props.imgItem.dirname }}</span>
          </li>
          <li>
            <p class="text-gray-700">extension:</p>
            <span class="text-gray-500 text-sm">{{ props.imgItem.extension }}</span>
          </li>
          <li>
            <p class="text-gray-700">path:</p>
            <span class="text-gray-500 text-sm">{{ props.imgItem.path }}</span>
          </li>
          <li>
            <p class="text-gray-700">size:</p>
            <span class="text-gray-500 text-sm">{{ formatBytes(props.imgItem.size) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['imgItem']);
const $emit = defineEmits(['close']);

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
</script>

<style scoped lang="scss">
.show-info {
  max-height: 90vh;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  ul {
    margin-top: 15px;
    li {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      p {
        padding-right: 10px;
      }
    }
  }
}
</style>
