import { useRoute } from 'vue-router';

export function useGetSortFromUrl() {
  const route = useRoute();
  return {
    sort: route.query.sort,
    by: route.query.by,
  };
}
