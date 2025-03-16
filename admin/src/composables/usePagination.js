import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useExtractPaginationFromUrl() {
  const route = useRoute();
  const params = route.query;
  return {
    page: params?.page,
    perPage: params?.perPage,
  };
}

export function usePaginationDataExtrator() {
  function extract(data) {
    return {
      current_page: data.current_page,
      last_page: data.last_page,
      per_page: data.per_page,
      total: data.total,
      from: data.from,
      to: data.to,
    };
  }

  return {
    extract,
  };
}

export default function usePagination() {
  const router = useRouter();
  const route = useRoute();

  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(1);
  const total = ref(1);
  const from = ref(1);
  const to = ref(1);

  watch(currentPage, (val) => {
    updateUrl(val, perPage.value);
  });

  watch(perPage, (val) => {
    updateUrl(currentPage.value, val);
  });

  function updateUrl(page, per_page) {
    router.replace({
      path: router.currentRoute.value.path,
      query: {
        ...route.query,
        page: page,
        perPage: per_page,
      },
    });
  }

  function updatePagination(paginationData) {
    currentPage.value = paginationData.current_page;
    lastPage.value = paginationData.last_page;
    perPage.value = paginationData.per_page;
    total.value = paginationData.total;
    from.value = paginationData.from;
    to.value = paginationData.to;
  }

  function changePerPage(newPerPage) {
    perPage.value = newPerPage;
  }

  function nextPage() {
    if (currentPage.value < lastPage.value) {
      currentPage.value += 1;
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  }

  function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= lastPage.value) {
      currentPage.value = pageNumber;
    }
  }

  return {
    currentPage,
    lastPage,
    perPage,
    total,
    from,
    to,
    updatePagination,
    changePerPage,
    nextPage,
    prevPage,
    goToPage,
  };
}
