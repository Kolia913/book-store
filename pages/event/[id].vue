<template>
  <div
    class="py-[38px] px-4 pt-25 lg:px-12 lg:py-50 xl:py-42 2xl:py-60 flex flex-col 2xl:flex-row xl:gap-8 justify-between xl:items-center"
  >
    <div class="flex flex-col lg:flex-row gap-12 items-center">
      <img :src="eventData.images[0]" class="w-full max-w-[400px] h-full" />

      <div class="w-full 2xl:w-3/4 self-start">
        <div class="app-text-h1 mb-[20px] italic">
          {{ eventData.title }}
        </div>
        <p class="app-text-small leading-relaxed mt-4 mb-12 lg:mb-0">
          {{ eventData.description }}
        </p>
        <div class="flex flex-col justify-between pb-2 pt-12">
          <span v-if="eventData.tickets_available" class="text-2xl font-medium italic"
            >Квитки є в наявності</span
          >
          <span v-else class="text-2xl font-medium italic text-primary-red"
            >Немає вільних місць</span
          >
          <NuxtLink
            to="https://t.me/grigoryobertailo"
            target="_blank"
            rel="noopener noreferrer"
          >
          <AtomsAppOutlinedButton
            value="Забронювати"
            color="black"
            class="text-lg uppercase mt-4 "
            :class="{
              'bg-gray-300 opacity-35 pointer-events-none ':
                !eventData.tickets_available,
            }"
           
          />
          </NuxtLink>
        </div>
       
      </div>
    </div>

  
    <div v-if="eventData.event_end">
      <div class="w-full xl:w-[420px] 2xl:w-[380px] self-end">
        
          <div
            class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#0000003f] z-100"
          >
            <div
              class="bg-white mx-4 rounded-3.5xl h-fit p-4 md:p-8 xl:p-12 gap-y-10 flex flex-col justify-center items-center md:gap-y-24"
            >
              <div class="text-center app-text-body">
                <p>Подію завершено!</p>
              </div>
              <IconsIconSuccess />
              <AtomsAppButton
                color="black"
                value="Повернутись до головної сторінки"
                @click="() => $router.push('/')"
              />
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const eventStore = useEventsStore();

const eventId = route.params.id;

const { data: eventData } = await useAsyncData(`eventData${eventId}`, () => {
  return eventStore.fetchEventsById(eventId);
});
</script>
