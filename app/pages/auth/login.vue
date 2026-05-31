<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({ layout: "auth" });

const schema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string("Password is required")
    .min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({ email: "", password: "" });

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);
};
</script>

<template>
  <UContainer class="mt-10 flex justify-center">
    <UCard title="Login" class="w-full transition-all sm:w-100">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
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
        <UButton
          variant="soft"
          color="neutral"
          label="Google"
          icon="simple-icons:google"
          class="flex w-full justify-center"
        />

        <UButton
          type="submit"
          color="neutral"
          class="flex w-full justify-center"
        >
          Submit
        </UButton>
      </UForm>

      <div class="mt-2 flex items-center justify-center text-xs">
        <span>Don't have an account?</span>
        <UButton
          variant="link"
          class="cursor-pointer text-xs"
          label="Sign Up"
          to="/auth/register"
        />
      </div>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
