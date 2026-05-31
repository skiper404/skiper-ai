export default defineNuxtConfig({
  components: true,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  css: ["~/assets/css/main.css"],
})
