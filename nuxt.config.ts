// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: [
    "@nuxthub/core",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
  ],
  hub: {
    database: true,
  },
});
