<template>
  <div class="flex items-start border-t border-black py-6 last:border-b">
    <!-- Book Cover -->
    <div class="w-1/4 flex justify-center">
      <img :src="item.image" class="w-auto h-auto" />
    </div>

    <!-- Book Info -->
    <div class="w-3/4 flex flex-col items-end text-end px-6 gap-7">
      <div class="">
        <h3 class="app-text-h1 font-semibold italic uppercase">
          {{ item.title }}
        </h3>
        <p class="text-gray-600 app-text-body mt-2">
          {{ item.description }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4">
        <AtomsAppOutlinedButton value="Більше" color="white" />
        <AtomsAppOutlinedButton value="Купити" color="black" />
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
