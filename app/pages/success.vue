<template>
  <div class="flex min-h-[70vh] items-center justify-center px-4">
    <div class="bg-primary/10 dark:bg-primary/5 w-full max-w-md rounded-2xl p-8 text-center shadow-sm">
      <Icon name="lucide:circle-check" size="60" class="text-success/50" />

      <h1 class="text-primary mb-2 text-2xl font-bold">Payment Successful</h1>

      <p class="text-primary/50 mb-6">
        Thank you for your purchase. Your subscription has been activated and is ready to use.
      </p>

      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:opacity-90"
      >
        Go to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
definePageMeta({
  layout: "auth",
})
useHead({ title: `${config.public.appName} | Payment success` })
</script>
