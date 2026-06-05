<script setup lang="ts">
const config = useRuntimeConfig()
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
})
useHead({ title: `${config.public.appName} | Profile` })

const { user, isPro, portalUrl, nextBillingDate, cancelAtPeriodEnd, status, refreshUser } = useCurrentUser()

const formatDate = (date?: string | null) => {
  if (!date) return "—"
  return new Date(date).toDateString()
}

const upgradeUserToPro = async () => {
  const { url } = await $fetch(`/api/checkout?customerEmail=${user.value?.email}`)
  await navigateTo(url, { external: true })
}
</script>

<template>
  <UContainer>
    <PageHeading title="Profile" description="Manage your subscription and account" />

    <div v-if="status === 'pending'" class="mt-2 flex items-center gap-2">
      <Icon name="lucide:loader" class="animate-spin" size="20" /> Loading...
    </div>

    <div v-else class="mt-2 space-y-6">
      <div class="rounded-lg border p-4">
        <div class="text-sm">
          <b>{{ user?.username }}</b>
        </div>
        <div class="text-muted-foreground text-xs">
          {{ user?.email }}
        </div>
      </div>

      <div class="space-y-2 rounded-lg border p-4">
        <div class="text-sm font-medium">
          {{ isPro ? "Pro plan" : "Free plan" }}
        </div>

        <div class="text-muted-foreground text-xs">
          <template v-if="isPro">
            <div v-if="cancelAtPeriodEnd">
              Subscription will end on
              <b>{{ formatDate(nextBillingDate) }}</b>
            </div>

            <div v-else>
              Next billing:
              <b>{{ formatDate(nextBillingDate) }}</b>
            </div>
          </template>

          <template v-else> You are on a free plan </template>
        </div>
      </div>

      <div class="flex gap-3">
        <UButton v-if="isPro && portalUrl" :to="portalUrl"> Manage subscription </UButton>

        <UButton v-else color="secondary" icon="lucide:zap" @click="upgradeUserToPro"> Upgrade to Pro </UButton>

        <UButton variant="soft" @click="() => refreshUser()"> Refresh </UButton>
      </div>
    </div>
  </UContainer>
</template>
