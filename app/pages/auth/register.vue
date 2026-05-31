<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui"
import { type RegisterUserSchema, registerUserSchema } from "@@/shared/schemas/register-user.schema"

definePageMeta({ layout: "auth", middleware: "guest" })

const state = reactive<RegisterUserSchema>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const onSubmit = async (event: FormSubmitEvent<RegisterUserSchema>) => {
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: event.data,
    })
    await navigateTo("/dashboard")
  } catch (e: unknown) {
    console.log(e)
  }
}
</script>

<template>
  <UContainer class="mt-10 flex justify-center">
    <UCard title="Register" class="w-full transition-all sm:w-100">
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
        <UButton
          variant="soft"
          color="neutral"
          label="Google"
          icon="simple-icons:google"
          class="flex w-full justify-center"
        />

        <UButton type="submit" color="neutral" class="flex w-full justify-center"> Submit </UButton>
      </UForm>
      <div class="mt-2 flex items-center justify-center text-xs">
        <span>Already have an account?</span>
        <UButton variant="link" class="cursor-pointer text-xs" label="Sign in" to="/auth/login" />
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
