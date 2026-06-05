<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <NuxtLink class="flex cursor-pointer items-center gap-2 text-lg font-bold" to="/">
    <Icon name="lucide:brain-circuit" size="26" class="text-success" />
    {{ config.public.appName }}
  </NuxtLink>
</template>
