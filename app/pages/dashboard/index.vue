<script setup lang="ts">
import { aiTools } from "~/data/ai-tools"

definePageMeta({ layout: "dashboard", middleware: "auth" })
</script>

<template>
  <UContainer>
    <PageHeading title="Dashboard" description="Dasboard description" />
    <div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink v-for="tool in aiTools" :key="tool.title" :to="tool.path">
        <UCard class="hover:bg-accented/50 h-full transition-all">
          <div class="item-center mb-4 flex">
            <UIcon :name="tool.icon" class="text-primary mr-2" />
            <span class="text-semibold">{{ tool.title }}</span>
          </div>
          <p class="text-dimmed">{{ tool.description }}</p>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>

<style scoped></style>
