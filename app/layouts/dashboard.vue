<script setup lang="ts">
import { useMediaQuery, useStorage } from "@vueuse/core"
import { navItems } from "~/data/nav-items"

const { dropdownItems } = useDropdownItems()

const isOpen = useStorage("isSidebarOpen", true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const isMobile = useMediaQuery("(max-width: 768px)")

watch(
  () => isMobile.value,
  () => {
    isOpen.value = false
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-screen">
    <header class="bg-primary/10 flex h-12 items-center justify-between px-4">
      <AppLogo />
      <div class="flex items-center gap-2">
        <UButton
          :icon="isOpen ? 'lucide:panel-left-open' : 'lucide:panel-left-close'"
          color="neutral"
          variant="ghost"
          class="ml-auto md:hidden"
          @click="toggleSidebar()"
        />

        <UDropdownMenu
          arrow
          :items="dropdownItems"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton icon="i-lucide-menu" color="neutral" variant="subtle" />
        </UDropdownMenu>
      </div>
    </header>

    <!-- Desktop -->

    <aside
      :class="['border-primary/10 fixed top-12 -left-full h-full w-60 border-r transition-all duration-500 md:left-0']"
    >
      <UNavigationMenu
        orientation="vertical"
        :items="navItems"
        class="p-4"
        color="secondary"
        :ui="{ list: 'space-y-2' }"
      />
    </aside>

    <!-- Mobile -->
    <aside
      :class="[
        'fixed top-12 z-10 h-full w-60 border-r border-neutral-700 backdrop-blur-xl transition-all duration-500 md:hidden',
        isOpen ? 'left-0' : '-left-full',
      ]"
    >
      <UNavigationMenu
        orientation="vertical"
        :items="navItems"
        class="p-4"
        color="secondary"
        :ui="{ list: 'space-y-2' }"
        @click="isOpen = false"
      />
    </aside>

    <div :class="['ml-0 h-[calc(100dvh-48px)] p-4 transition-all duration-500 md:ml-60']">
      <slot />
    </div>
  </div>
</template>
