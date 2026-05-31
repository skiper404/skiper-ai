<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: "auth" })
const { user } = useUserSession()
</script>

<template>
  <div>
    <PageHeading title="Dashboard" description="Dasboard description" />
    <div v-if="user">{{ user }}</div>
  </div>
</template>

<style scoped></style>
