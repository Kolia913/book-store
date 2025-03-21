// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "nuxt-security"],
  pinia: {
    storesDirs: ["./stores/**"],
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
  },
  vite: {
    plugins: [tailwindcss()],
  },
});