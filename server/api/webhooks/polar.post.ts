export default defineEventHandler((event) => {
  const config = useRuntimeConfig()

  const webhookHandler = Webhooks({
    webhookSecret: config.polarWebhookSecret!,

    onSubscriptionActive: async (payload) => {
      const userId = payload.data.metadata.userId as string

      if (!userId) return

      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: "PRO",
        },
      })
    },

    onSubscriptionRevoked: async (payload) => {
      const userId = payload.data.metadata.userId as string

      if (!userId) return

      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: "FREE",
        },
      })
    },
  })

  return webhookHandler(event)
})
