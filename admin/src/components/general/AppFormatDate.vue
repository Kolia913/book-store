<template>
  <span>{{ date ? dayjs(date, "DD-MM-YYYY").format('MM-DD-YYYY') : '' }}</span>
</template>

<script setup>
  import dayjs from 'dayjs';
  defineProps(['date']);
</script>