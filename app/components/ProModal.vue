<script setup lang="ts">
import { aiTools } from "~/data/ai-tools"
const { isOpen } = useModalPro()
const { user } = useCurrentUser()

const upgradeUserToPro = async () => {
  const { url } = await $fetch(`/api/checkout?customerEmail=${user.value?.email}`)
  await navigateTo(url, { external: true })
}
</script>

<template>
  <UModal v-model:open="isOpen" title="Upgrade to Skiper AI Pro">
    <template #body>
      <div class="p-4">
        <div class="flex flex-col space-y-2 text-center">
          <div v-for="tool in aiTools" :key="tool.path">
            <UCard :ui="{ body: 'p-3 sm:p-3' }">
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center gap-x-4">
                  <UButton :icon="tool.icon" size="md" color="primary" variant="subtle" />
                  <div class="font-semibold">{{ tool.title }}</div>
                </div>
                <Icon name="lucide:check" class="text-primary h-5 w-5" />
              </div>
            </UCard>
          </div>
        </div>
        <UButton icon="lucide:arrow-big-up" color="error" class="mt-4 w-full justify-center" @click="upgradeUserToPro">
          Upgrade
        </UButton>
      </div>
    </template>
  </UModal>
</template>
