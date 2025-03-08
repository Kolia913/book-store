<template>
  <div
    class="flex flex-col md:flex-row md:gap-8 items-center md:items-start border-t border-black py-6 last:border-b"
  >
    <!-- Book Cover -->
    <div class="w-full md:w-1/2 flex justify-center">
      <img :src="item.image" class="w-auto h-auto" />
    </div>

    <!-- Book Info -->
    <div
      class="w-full flex flex-col items-center md:items-end text-left md:text-right px-0 md:px-6 gap-7"
    >
      <div class="pt-6">
        <h3
          class="text-3xl md:text-4xl lg:text-6xl font-semibold italic uppercase"
        >
          {{ item.title }}
        </h3>
        <p class="text-gray-600 app-text-body mt-2">
          {{ item.description }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 flex-wrap justify-center">
        <AtomsAppOutlinedButton
          value="Більше"
          color="black"
          @click="
            $router.push({
              path: '/book',
              query: { item: JSON.stringify(item) },
            })
          "
        />
        <AtomsAppOutlinedButton value="Купити" color="filled" />
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
