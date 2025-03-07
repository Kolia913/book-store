<template>
  <div class="flex justify-start items-stretch gap-[170px] pt-[168px]">
    <div class="shrink-0">
      <img src="/images/history.png" class="w-auto h-auto" />
    </div>

    <div class="flex flex-col justify-between pr-[52px] flex-1 min-h-[100%]">
      <div>
        <h2 class="app-text-h1 pb-[60px]">Моя історія</h2>
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
        value="Більше"
        color="black"
        class="mt-auto"
        @click="$router.push('/extended-history')"
      />
    </div>
  </div>
</template>
