<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="bg-primary/10 flex h-12 items-center justify-between px-4">
      <AppLogo />
      <div class="flex items-center space-x-2">
        <UColorModeButton class="ml-auto" />
        <UButton variant="subtle" color="neutral" to="/auth/login"> Sign In </UButton>
        <UButton to="/auth/register"> Sign Up </UButton>
      </div>
    </header>

    <div class="flex-1 p-4 transition-all duration-500">
      <slot />
    </div>

    <AppFooter />
  </div>
</template>
