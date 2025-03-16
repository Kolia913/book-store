import AppBreadcrumbs from '@/components/general/AppBreadcrumbs.vue';
import AppPageTitle from '@/components/atoms/headings/AppPageTitle.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

export default {
  install(app) {
    app.component('page-title', AppPageTitle);
    app.component('breadcrumbs', AppBreadcrumbs);
    app.component('app-button', AppButton);
  },
};
