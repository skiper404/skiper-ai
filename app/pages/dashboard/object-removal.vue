<script setup lang="ts">
import type { FetchError } from "ofetch"
import type { FormSubmitEvent } from "@nuxt/ui"
import { imageSchema, type ImageSchema } from "~~/shared/schemas/remove-object-image.schema"

const config = useRuntimeConfig()
definePageMeta({ layout: "dashboard", middleware: "auth" })
useHead({ title: `${config.public.appName} | Object Removal` })

const { refreshUser, user } = useCurrentUser()
const { toggleOpen } = useModalPro()

const isLoading = ref(false)
const error = ref<AppError | null>()
const mappedImageUrl = ref("")

const state = reactive<Partial<ImageSchema>>({
  image: undefined,
  object: "",
})

const resetImage = () => {
  state.image = undefined
  state.object = ""
  mappedImageUrl.value = ""
}

const removeBg = async (event: FormSubmitEvent<ImageSchema>) => {
  if ((user.value?.generations ?? 0) >= 10 && user.value?.plan === "FREE") {
    toggleOpen(true)
  }

  try {
    isLoading.value = true
    const formData = new FormData()

    if (event.data.image instanceof File) {
      formData.append("image", event.data.image)
    }

    const data = await $fetch("/api/cloudinary-tools/remove-object", {
      method: "POST",
      body: formData,
    })

    if (data) {
      mappedImageUrl.value = data
    }

    refreshUser()
  } catch (e) {
    const err = e as FetchError
    if (err.statusCode === 401) {
      await navigateTo("/auth/login")
    }
    error.value = getError(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UContainer>
    <PageHeading title="Object removal" description="Object removal description" />
    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      :title="error.statusCode + ''"
      :description="error.statusMessage"
      class="mt-2"
    />
    <div class="mt-2 grid grid-cols-1 gap-6 xl:grid-cols-2 xl:items-start">
      <UCard>
        <UForm :schema="imageSchema" :state="state" class="space-y-4" @submit="removeBg">
          <UFormField name="object" label="Object to remove" description="Describe what should be remove from image">
            <UInput v-model="state.object" class="w-full" placeholder="Remove people from background" />
          </UFormField>
          <UFormField name="image" label="Image" description="JPG, GIF or PNG. 2MB Max.">
            <UFileUpload v-model="state.image" accept="image/*" class="h-110" />
          </UFormField>

          <UButton type="submit" label="Submit" color="neutral" :disabled="isLoading" :loading="isLoading" />
          <UButton type="button" label="Reset" class="ml-4" color="error" @click="resetImage" />
        </UForm>
      </UCard>

      <UCard
        class="bg-primary/5 relative flex min-h-full w-full items-center justify-center"
        :ui="{ body: 'p-3 sm:p-4 h-full' }"
      >
        <Icon v-if="!isLoading && !mappedImageUrl" name="lucide:image" class="text-primary/10" size="140" />

        <img
          v-else-if="mappedImageUrl"
          :src="mappedImageUrl"
          :alt="state.image?.name"
          class="max-h-125 w-auto object-contain"
        />

        <Icon v-else name="lucide:loader" class="text-primary/30 animate-spin" size="48" />
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped></style>
