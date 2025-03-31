// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-security", "@vee-validate/nuxt"],

  pinia: {
    storesDirs: ["./stores/**"],
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "connect-src": [
          "'self'",
          "https://secure.wayforpay.com",
          "https://api.novaposhta.ua",
          "https://widget.wayforpay.com"
        ],
        "form-action": [
          "'self'",
           "https://secure.wayforpay.com",
          "https://widget.wayforpay.com"
        ],
        "frame-src": [
          "'self'",
           "https://secure.wayforpay.com",
          "https://widget.wayforpay.com"],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "https://secure.wayforpay.com",
          "https://widget.wayforpay.com"
        ],
      },
    },
  },
  routeRules: {
    "/api/**": {
      security: {
        corsHandler: {
          origin: "*",
          methods: "*",
          credentials: true,
        },
      },
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    wayforpayMerchantLogin: process.env.WAYFORPAY_MERCHANT_LOGIN,
    wayforpaySecretKey: process.env.WAYFORPAY_SECRET_KEY,
    wayforpayCallbackUrl: process.env.WAYFORPAY_CALLBACK_URL,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['lodash']
    }
  },
});
