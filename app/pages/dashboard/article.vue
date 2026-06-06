<script setup lang="ts">
import { articleLength } from "../../data/article-items"
import { articleSchema, type ArticleSchema } from "@@/shared/schemas/article.schema"
import type { FetchError } from "ofetch"

const config = useRuntimeConfig()
definePageMeta({ layout: "dashboard", middleware: "auth" })
useHead({ title: `${config.public.appName} | Register` })

const { refreshUser, user } = useCurrentUser()
const { toggleOpen } = useModalPro()

const isLoading = ref(false)
const error = ref<AppError | null>(null)

const state = reactive<ArticleSchema>({
  articleTitle: "",
  articleLength: 300,
})

const article = ref<string>("")

const generateArticle = async () => {
  if ((user.value?.generations ?? 0) >= 10 && user.value?.plan === "FREE") {
    toggleOpen(true)
  }

  error.value = null

  try {
    if (isLoading.value) return

    isLoading.value = true

    const data = await $fetch("/api/ai-tools/article", {
      method: "POST",
      body: state,
    })

    if (data) {
      article.value = data
    }
    refreshUser()

    state.articleTitle = ""
    state.articleLength = 300
  } catch (e) {
    error.value = getError(e as FetchError)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UContainer>
    <PageHeading title="AI Article Writer" description="Article writer description" />
    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      :title="error.statusCode + ''"
      :description="error.statusMessage"
      class="mt-2"
    />
    <UCard class="mt-2 rounded-xl">
      <UForm class="space-y-4" :schema="articleSchema" :state="state" @submit="generateArticle">
        <UFormField class="" label="Article Topic">
          <UInput v-model="state.articleTitle" class="w-full" placeholder="Fastfood in modern live" />
        </UFormField>
        <UFormField class="" label="Article Length">
          <USelect v-model="state.articleLength" class="w-full" :items="articleLength" />
        </UFormField>
        <UButton label="Submit" type="submit" :loading="isLoading" :disabled="isLoading" />
      </UForm>
      <div class="relative">
        <div
          :class="[
            'bg-primary/2 scrollbar-thumb-success/50 mt-2 overflow-y-auto rounded-xl p-8',
            error ? 'h-[calc(100dvh-462px)]' : 'h-[calc(100dvh-380px)]',
          ]"
        >
          <Icon
            v-if="!article?.length"
            :name="'lucide:file-pen'"
            class="text-primary/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="170"
          />
          <MDC :value="article" />
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
