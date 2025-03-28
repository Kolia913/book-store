export const usePaymentStore = defineStore("payment", {
  state: () => ({
    orderReference: "",
    paymentStatus: "idle",
    paymentUrl: "",
  }),
  actions: {
    setPaymentData(orderReference, paymentUrl) {
      this.orderReference = orderReference;
      this.paymentUrl = paymentUrl;
      this.paymentStatus = "pending";
    },
    updateStatus(status) {
      this.paymentStatus = status;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useTranslationsStore, import.meta.hot)
  );
}
