import { createRouter, createWebHistory } from 'vue-router';
import AppRouter from '@/core/AppRouter';
import useAppConfig from '@/core/composables/useAppConfig';

import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';

import Translations from '@/views/Translations';

const config = useAppConfig();

function isAuthenticated(to, from, next) {
  if (localStorage.getItem(`${config.tokenName}`)) {
    next();
  } else {
    next('/login');
  }
}

const appRouter = new AppRouter();

// Translations module
appRouter.registerModule(Translations, 'Translations', {
  guards: { beforeEnter: isAuthenticated },
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { layout: 'EmptyLayout' },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      beforeEnter: isAuthenticated,
    },
  ].concat(...appRouter.routes),
});

export default router;
