<template>
  <div class="flex flex-col justify-start items-center gap-y-8">
    <page-title text="Dashboard" />
    <div
      class="flex lg:flex-row lg:justify-between flex-col justify-start items-center w-full gap-6"
    >
      <AppCard class="w-full">
        <div class="sm:px-6 px-3 py-6 flex flex-row justify-between items-center card__content">
          <div class="flex flex-row justify-start items-center gap-x-3">
            <AvatarDemo class="w-10 h-10 rounded-full" />
            <div class="flex flex-col justify-center items-start">
              <span class="font-semibold">Welcome</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Demo User</span>
            </div>
          </div>
          <AppButton text="Sign out" variant="outline" class="hidden sm:flex">
            <template #icon>
              <SignoutIcon class="w-4 h-4" />
            </template>
          </AppButton>
          <div
            class="w-8 h-8 flex justify-center items-center sm:hidden cursor-pointer rounded-lg hover:bg-grey-100 dark:hover:bg-grey-dark-50"
          >
            <SignoutIcon class="w-6 h-6" />
          </div>
        </div>
      </AppCard>
      <AppCard class="w-full">
        <div class="sm:px-6 px-3 py-6 flex flex-row justify-between items-center card__content">
          <div class="flex flex-col justify-center items-start sm:gap-0 gap-1">
            <span class="font-bold sm:text-xl text-base">Vue Admin</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">v 0.3.1</span>
          </div>
          <div class="flex flex-col justify-center items-start gap-y-2">
            <a
              class="flex flex-row justify-start items-center gap-2 text-sm font-semibold"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <LinkedinIcon class="w-4 h-4" />
              Linked In
            </a>
            <a
              class="flex flex-row justify-start items-center gap-2 text-sm font-semibold"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon class="w-4 h-4" />
              Github
            </a>
          </div>
        </div>
      </AppCard>
    </div>
    <span class="text-grey-200 dark:text-grey-400">Vue Admin © {{ dayjs().format('YYYY') }}</span>
  </div>
</template>

<script setup>
import AvatarDemo from '@/components/icons/AvatarDemo.vue';
import SignoutIcon from '@/components/icons/SignoutIcon.vue';
import AppCard from '@/components/general/AppCard.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import LinkedinIcon from '../components/icons/LinkedinIcon.vue';
import GithubIcon from '../components/icons/GithubIcon.vue';
import dayjs from 'dayjs';
</script>
<style lang="scss" scoped>
.card__content {
  max-height: 92px;
}
</style>
