<template>
  <div>
    <app-aside />
    <app-header />
    <main class="content pt-24 flex justify-center items-center">
      <div class="w-full max-w-7xl">
        <router-view />
      </div>
    </main>
  </div>
</template>
<script setup>
import AppHeader from '@/components/partials/Header/AppHeader.vue';
import AppAside from '@/components/partials/Aside/AppAside.vue';
</script>

<style lang="scss" scoped>
.content {
  padding-left: 372px;
  padding-right: 32px;
  @media screen and (max-width: 1280px) {
    padding-left: 312px;
  }
  @media screen and (max-width: 1024px) {
    padding-left: 32px;
  }
}
</style>
