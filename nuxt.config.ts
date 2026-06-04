export default defineNuxtConfig({
  components: true,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils", "@nuxtjs/mdc"],
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    polarAccessToken: process.env.POLAR_ACCESS_TOKEN,
    polarServer: process.env.POLAR_SERVER,
    polarWebhookSecret: process.env.POLAR_WEBHOOK_SECRET,
    polarProductId: process.env.POLAR_PRODUCT_ID,
  },
})
