export const useCurrentUser = () => {
  const {
    data,
    status,
    refresh: refreshUser,
  } = useFetch("/api/user", {
    key: "current-user",
  })

  const user = computed(() => data.value?.user ?? null)
  const isPro = computed(() => data.value?.isPro ?? false)

  const subscription = computed(() => data.value?.subscription ?? null)
  const portalUrl = computed(() => data.value?.portalUrl ?? null)
  const nextBillingDate = computed(() => data.value?.nextBillingDate ?? null)
  const cancelAtPeriodEnd = computed(() => data.value?.cancelAtPeriodEnd ?? false)

  return {
    data,
    status,
    refreshUser,

    user,
    isPro,

    subscription,
    portalUrl,
    nextBillingDate,
    cancelAtPeriodEnd,
  }
}
