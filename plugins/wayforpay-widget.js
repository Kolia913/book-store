export default defineNuxtPlugin(() => {
  return {
    provide: {
      wayforpay: {
        load: () => {
          return new Promise((resolve) => {
            if (window.Wayforpay) {
              resolve(new window.Wayforpay());
              return;
            }

            const script = document.createElement("script");
            script.src = "https://secure.wayforpay.com/server/pay-widget.js";
            script.onload = () => {
              resolve(new window.Wayforpay());
            };
            document.body.appendChild(script);
          });
        },
      },
    },
  };
});
