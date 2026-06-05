<script setup lang="ts">
import { aiTools } from "~/data/ai-tools"
import { reviews } from "~/data/reviews"

const config = useRuntimeConfig()
definePageMeta({ layout: "default", middleware: "guest" })
useHead({ title: config.public.appName })
</script>

<template>
  <div>
    <UContainer id="hero">
      <div class="flex flex-col items-center justify-center py-32 text-center sm:py-48 lg:pt-50 lg:pb-64">
        <h1 class="text-3xl font-bold tracking-tight sm:text-8xl">Create amazing AI tools</h1>
        <p class="text-dimmed mt-4 max-w-xl text-lg">
          Launch modern websites and apps with beautiful components, built-in dark mode, and Nuxt 4 integration
        </p>
        <div class="mt-6">
          <div class="flex flex-wrap gap-2 sm:gap-8">
            <UButton icon="lucide:zap" to="/auth/login" size="xl" color="success"> Get Started </UButton>
            <UButton icon="lucide:arrow-right" to="#features" size="xl" color="primary"> Explore tools </UButton>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <UAvatarGroup>
            <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
            <UAvatar src="https://github.com/skiper404.png" alt="Romain Hamel" />
            <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
          </UAvatarGroup>
          <p>Loved by 10k+ people</p>
        </div>
      </div>
    </UContainer>

    <UContainer id="features">
      <div class="mb-10 flex flex-col items-center justify-center text-center sm:mb-20">
        <h2 class="text-center text-2xl font-bold md:text-4xl">Explore the power of AI</h2>
        <p class="text-muted-foreground text-center text-sm font-light md:text-lg">
          Everything yot need to create, enhanse and optimazi your content with AI
        </p>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="tool in aiTools" :key="tool.title" class="hover:bg-accented/50 h-full" :ui="{ body: 'h-full' }">
          <div class="flex h-full flex-col space-y-2">
            <div class="flex-1">
              <UButton :icon="tool.icon" size="md" color="primary" variant="subtle" />
              <h6 class="my-4 font-semibold">{{ tool.title }}</h6>
              <p class="text-dimmed">{{ tool.description }}</p>
            </div>
            <div class="mt-auto">
              <UButton :to="tool.path" trailing-icon="lucide:zap" size="md" variant="soft">
                {{ tool.btnText }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>

    <UContainer id="reviews" class="mt-20">
      <div class="mb-10 flex flex-col items-center justify-center text-center sm:mb-20">
        <h2 class="text-center text-2xl font-bold md:text-2xl">Loved by customers</h2>
        <p class="text-muted-foreground text-center text-sm font-light md:text-lg">
          Checkout the reviews, what our customers says about us
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="review in reviews" :key="review.user" class="h-full">
          <div class="flex h-full flex-col justify-between space-y-4">
            <!-- top -->
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <UAvatar :src="review.url" :alt="review.user" />

                <div class="flex flex-col">
                  <p class="font-semibold">{{ review.user }}</p>
                  <p class="text-dimmed text-sm">{{ review.designation }}</p>
                </div>
              </div>

              <h3 class="text-base font-semibold">
                {{ review.title }}
              </h3>

              <p class="text-dimmed text-sm leading-relaxed">
                {{ review.review }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<style scoped></style>
