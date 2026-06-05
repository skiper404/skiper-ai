<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui"
import { type RegisterUserSchema, registerUserSchema } from "@@/shared/schemas/register-user.schema"
import type { FetchError } from "ofetch"

const config = useRuntimeConfig()
definePageMeta({ layout: "auth", middleware: "guest" })
useHead({ title: `${config.public.appName} | Register` })

const state = reactive<RegisterUserSchema>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
})
const error = ref<AppError | null>(null)

const onSubmit = async (event: FormSubmitEvent<RegisterUserSchema>) => {
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: event.data,
    })
    await navigateTo("/dashboard")
  } catch (e) {
    const err = e as FetchError

    if (err.statusCode === 409) {
      error.value = getError(err)
    }
  }
}
</script>

<template>
  <UContainer class="mt-20 flex justify-center">
    <UCard title="Register" class="w-full transition-all sm:w-100">
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusMessage" class="mb-2" />
      <UForm :schema="registerUserSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Username" name="username" required>
          <UInput
            v-model="state.username"
            placeholder="username"
            variant="subtle"
            trailing-icon="lucide-user"
            class="w-full"
          />
        </UFormField>

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

        <UFormField label="Confirm Password" name="confirmPassword" required>
          <UInput
            v-model="state.confirmPassword"
            type="password"
            placeholder="********"
            variant="subtle"
            trailing-icon="lucide-lock"
            class="w-full"
          />
        </UFormField>
        <USeparator label="or" />
        <a href="/api/auth/google" class="bg-accented flex h-8 items-center justify-center gap-1 rounded-lg text-sm">
          <Icon name="logos:google-icon" size="20" />Sign up with Google</a
        >

        <UButton type="submit" color="neutral" class="flex w-full justify-center"> Submit </UButton>
      </UForm>
      <div class="mt-2 flex items-center justify-center text-xs">
        <span>Already have an account?</span>
        <UButton variant="link" class="text-success cursor-pointer text-xs" label="Sign in" to="/auth/login" />
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
