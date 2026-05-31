<script setup lang="ts">
const { title, description } = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold text-neutral-100">{{ title }}</h2>
    <p class="text-neutral-500">{{ description }}</p>
  </div>
</template>

<style scoped></style>
