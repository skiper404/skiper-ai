<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: "auth" })

const error = ref<AppError | null>()
</script>

<template>
  <UContainer>
    <PageHeading title="Resume reviewer" description="Resume reviewer" />
    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      :title="error.statusCode + ''"
      :description="error.statusMessage"
      class="mt-2"
    />
  </UContainer>
</template>

<style scoped></style>
