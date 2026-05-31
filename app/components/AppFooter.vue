<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

const items: NavigationMenuItem[] = [
  {
    label: "Explore more",
    to: "/",
  },
  {
    label: "Playground",
    to: "/",
  },
  {
    label: "Releases",
    to: "/",
  },
]
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/skiper404"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
