<template>
  <div
    :class="{
      'bg-white': $route.path !== '/order',
      'bg-[#E9E9E9]': $route.path === '/order',
    }"
    v
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
