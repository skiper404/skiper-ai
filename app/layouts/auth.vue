<script setup lang="ts"></script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="bg-primary/10 flex h-12 items-center justify-between px-4">
      <AppLogo />
      <UColorModeButton class="ml-auto" />
    </header>
    <slot />
  </div>
</template>
