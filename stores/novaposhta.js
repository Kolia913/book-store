export const useNPStore = defineStore("novapost", {
  state: () => ({
    settlements: {},
  }),
  actions: {
    async fetchSettlements(cityName) {
      try {
        const res = await $fetch("https://api.novaposhta.ua/v2.0/json/", {
          method: "POST",
          body: {
            apiKey: import.meta.env.NP_API_KEY,
            modelName: "AddressGeneral",
            calledMethod: "searchSettlements",
            methodProperties: {
              CityName: cityName,
              Page: "1",
              Limit: "10",
              Language: "UA",
            },
          },
        });
        this.settlements = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async fetchWarehouses(settlementRef, warehouseNum) {
      try {
        const res = await $fetch("https://api.novaposhta.ua/v2.0/json/", {
          method: "POST",
          body: {
            apiKey: import.meta.env.NP_API_KEY,
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
              FindByString: warehouseNum,
              SettlementRef: settlementRef,
              Page: "1",
              Limit: "10",
              Language: "UA",
            },
          },
        });
        this.settlements = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNPStore, import.meta.hot));
}
