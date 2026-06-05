<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui"
import { type LoginUserSchema, loginUserSchema } from "@@/shared/schemas/login-user.schema"
import type { FetchError } from "ofetch"

const config = useRuntimeConfig()
definePageMeta({ layout: "auth", middleware: "guest" })
useHead({ title: `${config.public.appName} | Login` })

const state = reactive<LoginUserSchema>({ email: "", password: "" })
const error = ref<AppError | null>(null)

const onSubmit = async (event: FormSubmitEvent<LoginUserSchema>) => {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: event.data,
    })
    await navigateTo("/dashboard")
  } catch (e) {
    const err = e as FetchError

    if (err.statusCode === 401) {
      error.value = getError(err)
    }
  }
}
</script>

<template>
  <UContainer class="mt-20 flex justify-center">
    <UCard title="Login" class="w-full transition-all sm:w-100">
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusMessage" class="mb-2" />
      <UForm :schema="loginUserSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email" required>
          <UInput
            v-model="state.email"
            placeholder="example@mail.com"
            variant="subtle"
            trailing-icon="lucide-at-sign"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput
            v-model="state.password"
            type="password"
            placeholder="********"
            variant="subtle"
            trailing-icon="lucide-lock"
            class="w-full"
          />
        </UFormField>
        <USeparator label="or" />
        <a href="/api/auth/google" class="bg-accented flex h-8 items-center justify-center gap-1 rounded-lg text-sm">
          <Icon name="logos:google-icon" size="20" />Sign in with Google</a
        >

        <UButton type="submit" color="neutral" class="flex w-full justify-center"> Submit </UButton>
      </UForm>

      <div class="mt-2 flex items-center justify-center text-xs">
        <span>Don't have an account?</span>
        <UButton variant="link" class="text-success cursor-pointer text-xs" label="Sign Up" to="/auth/register" />
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
