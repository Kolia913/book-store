<template>
  <breadcrumbs :breadcrumbs="breadcrumbsData" />
  <div class="pt-2">
    <page-title :text="`Robots.txt`" />
  </div>
  <AppCard class="p-4 mt-4">
    <div class="flex flex-col justify-start gap-y-6">
      <AppTextarea v-model="robotsData" label="Robots.txt content" />
      <AppButton variant="success" text="Save" type="button" @onClick="updateRobots" />
    </div>
  </AppCard>
</template>
<script setup>
import AppCard from '@/components/general/AppCard.vue';
import AppTextarea from '@/components/atoms/inputs/form/AppTextarea.vue';

import AppButton from '@/components/atoms/buttons/AppButton.vue';
import useRobotsStore from '@/stores/robots';
import { reactive, ref, onMounted } from 'vue';

const robotsData = ref('');

const robotsStore = useRobotsStore();

const breadcrumbsData = reactive([
  {
    title: 'Robots',
    link: { name: 'Robots' },
  },
]);

onMounted(() => {
  robotsStore.fetchRobots().then((res) => {
    robotsData.value = res.result.content;
  });
});

function updateRobots() {
  robotsStore.updateRobots(robotsData.value);
}
</script>
