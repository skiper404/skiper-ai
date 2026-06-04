<script setup lang="ts">
import { useMediaQuery, useStorage } from "@vueuse/core"
import { FREE_GENERATIONS } from "~/constants/constants"
import { navItems } from "~/data/nav-items"

const { dropdownItems } = useDropdownItems()
const { currentUser } = useCurrentUser()
const { toggleOpen, isOpen: isModalPro } = useModalPro()

const isOpen = useStorage("isSidebarOpen", true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const isMobile = useMediaQuery("(max-width: 768px)")

const progress = computed(() => {
  const generations = currentUser.value?.generations ?? 0
  return (generations / FREE_GENERATIONS) * 100
})

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
      <pre>{{ isModalPro }}</pre>
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

    <aside
      class="border-primary/10 fixed top-12 -left-full flex h-full w-60 flex-col border-r transition-all duration-500 md:left-0"
    >
      <UNavigationMenu
        orientation="vertical"
        :items="navItems"
        class="flex-1 p-4"
        color="success"
        :ui="{ list: 'space-y-2' }"
      />

      <div v-if="currentUser" class="mt-auto hidden w-full -translate-y-14 flex-col space-y-4 p-4 md:flex">
        <div>{{ currentUser.generations }}/{{ FREE_GENERATIONS }} Free Generations</div>
        <UProgress :model-value="progress" color="success" />
        <UButton class="flex w-full justify-center" color="secondary" @click="toggleOpen(true)">
          <Icon name="lucide:zap" />
          Upgrade
        </UButton>
      </div>
    </aside>

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
        color="success"
        :ui="{ list: 'space-y-2' }"
        @click="isOpen = false"
      />
      <div v-if="currentUser" class="fixed bottom-20 left-4 flex w-50 flex-col space-y-4">
        <div>{{ currentUser.generations }}/{{ FREE_GENERATIONS }} Free Generations</div>
        <UProgress :model-value="progress" color="success" />
        <UButton class="flex w-full justify-center" color="secondary" @click="toggleOpen(true)">
          <Icon name="lucide:zap" />
          Upgrade
        </UButton>
      </div>
    </aside>

    <div :class="['ml-0 h-[calc(100dvh-48px)] p-4 transition-all duration-500 md:ml-60']">
      <slot />
    </div>
    <ProModal />
  </div>
</template>
