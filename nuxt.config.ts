export default defineNuxtConfig({
  components: true,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils", "@nuxtjs/mdc", "@polar-sh/nuxt"],
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    sessionPassword: process.env.NUXT_SESSION_PASSWORD,

    groqApiKey: process.env.NUXT_GROQ_API_KEY,

    cloudinary: {
      apiKey: process.env.NUXT_CLOUDINARY_API_KEY,
      apiSecret: process.env.NUXT_CLOUDINARY_API_SECRET,
      cloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
    },

    databaseUrl: process.env.DATABASE_URL,

    polar: {
      accessToken: process.env.POLAR_ACCESS_TOKEN,
      webhookSecret: process.env.POLAR_WEBHOOK_SECRET,
      productId: process.env.POLAR_PRODUCT_ID,
      server: process.env.POLAR_SERVER,
      successUrl: process.env.POLAR_SUCCESS_URL,
    },

    public: {
      appName: "Skiper AI",
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
    },
  },

  vite: { server: { allowedHosts: true } },
})
