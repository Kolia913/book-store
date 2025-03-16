import { defineCrudStore } from '@/core/AppStore';
const useTranslationsStore = defineCrudStore('translations', '/translations', {
  omit: [],
  options: {},
});
export { useTranslationsStore };
