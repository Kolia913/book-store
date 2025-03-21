<template>
  <div
    class="flex justify-start flex-col-reverse lg:flex-row items-stretch gap-12 lg:gap-0 pt-[50px] xl:pt-[138px]"
    id="story"
  >
    <div class="flex-1">
      <img src="/uploads/history.png" class="w-auto h-auto object-fit" />
    </div>

    <div class="flex flex-col justify-between px-[32px] flex-1 min-h-[100%]">
      <div>
        <h2
          class="app-text-h1 pb-[10px] sm:pb-[20px] lg:pb-[10px] xl:pb-[30px]"
        >
          Моя історія
        </h2>
        <p class="text-wrap app-text-body font-normal">
          Явився я на світ Божий останнього місяця сімдесят шостого року
          двадцятого сторіччя – саме тоді, коли зародились перші бактерії з
          водоростями. Тоді бронтозаври чубились зі стегозаврами за володіння
          найвигіднішими галявинами, порослими древньою соковитою травичкою, а
          безсердні шаблезубі тигри тільки й дивились, як зʼїсти переможця тої
          борні – це я написав для прикладу, аби поколінню міленіалів було
          зрозуміліше.
          <br /><br />
          Для старшого сегменту й так ясно, що народився я в часи розквіту тричі
          клятого вошивого «совка», най би його шляки трафили.
        </p>
      </div>

      <AtomsAppOutlinedButton
        :value="data.button_more"
        color="black"
        class="mt-8"
        @click="$router.push('/extended-history')"
      />
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
@media (min-width: 1024px) {
  .app-text-body {
    font-size: 1.7vw !important;
  }
}
</style>
