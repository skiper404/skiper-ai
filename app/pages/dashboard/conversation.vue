<script setup lang="ts">
import type { FetchError } from "ofetch"
import type { FormSubmitEvent } from "@nuxt/ui"
import type { Message } from "@@/shared/types/message"
import { type PromptSchema, promptSchema } from "@@/shared/schemas/prompt.schema"

definePageMeta({ layout: "dashboard", middleware: "auth" })
const { refreshUser, currentUser } = useCurrentUser()
const { toggleOpen } = useModalPro()

const isLoading = ref(false)
const messages = ref<Message[]>([])
const error = ref<AppError | null>(null)

const state = reactive<PromptSchema>({
  userPrompt: "",
})

const submitPrompt = async (prompt: string) => {
  error.value = null

  try {
    if (isLoading.value) return

    isLoading.value = true

    messages.value.push({
      role: "user",
      content: prompt.trim(),
    })

    const data = await $fetch("/api/ai-tools/conversation", {
      method: "POST",
      body: {
        messages: messages.value,
      },
    })

    if (data) {
      messages.value.push({
        role: "assistant",
        content: data,
      })

      refreshUser()

      state.userPrompt = ""
    }
  } catch (e) {
    error.value = getError(e as FetchError)
  } finally {
    isLoading.value = false
  }
}

const sendMessage = async (event: FormSubmitEvent<PromptSchema>) => {
  if ((currentUser.value?.generations ?? 0) >= 10) {
    toggleOpen(true)
  }

  await submitPrompt(event.data.userPrompt)
}

const submitOnEnter = async () => {
  if (!state.userPrompt.trim()) return

  if ((currentUser.value?.generations ?? 0) >= 10) {
    toggleOpen(true)
  }

  await submitPrompt(state.userPrompt)
}
</script>

<template>
  <UContainer>
    <PageHeading title="Conversation" description="Conversation description" />

    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      :title="error.statusCode + ''"
      :description="error.statusMessage"
      class="my-2"
    />

    <div
      :class="[
        'bg-primary/2 scrollbar-thumb-success/50 relative mt-2 space-y-4 overflow-y-auto rounded-xl p-4',
        error ? 'h-[calc(100dvh-324px)]' : 'h-[calc(100dvh-240px)]',
      ]"
    >
      <Icon
        v-if="!messages.length"
        name="lucide:messages-square"
        class="text-primary/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size="170"
      />
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['flex', msg.role === 'assistant' ? 'justify-start' : 'justify-end']"
      >
        <div class="bg-primary/10 flex max-w-prose items-center gap-2 rounded-2xl px-2">
          <Icon
            :name="msg.role === 'assistant' ? 'lucide:bot' : 'lucide:user'"
            size="20"
            :class="['shrink-0', msg.role === 'assistant' ? 'text-success' : 'text-primary']"
          />
          <MDC :value="msg.content" />
        </div>
      </div>
    </div>

    <div class="w-full py-4">
      <UForm class="flex items-center gap-4" :schema="promptSchema" :state="state" @submit="sendMessage">
        <UTextarea
          v-model="state.userPrompt"
          class="scrollbar-thumb-success/50 w-full"
          :maxrows="3"
          variant="outline"
          placeholder="Ask my anything..."
          autoresize
          icon="lucide:bot"
          @keydown.enter.prevent="submitOnEnter"
        />
        <UButton icon="lucide:arrow-up" type="submit" size="xl" :loading="isLoading" :disabled="isLoading" />
      </UForm>
    </div>
  </UContainer>
</template>
