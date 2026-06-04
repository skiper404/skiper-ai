import { polar } from "@@/server/utils/polar"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const config = useRuntimeConfig()

  const checkout = await polar.checkouts.create({
    products: [config.polarProductId],
    successUrl: `${process.env.NUXT_PUBLIC_APP_URL}/dashboard`,
    metadata: { userId: session.user.id },
  })

  return {
    url: checkout.url,
  }
})
