import { getCustomerPortalUrl, getUserSubscription } from "../utils/polar"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    })
  }

  const subscription = await getUserSubscription(user.id)

  const portalUrl = await getCustomerPortalUrl({
    id: user.id,
    email: user.email,
  })

  const isPro = user.plan === "PRO"

  const nextBillingDate = subscription?.currentPeriodEnd ?? subscription?.endsAt ?? null

  const cancelAtPeriodEnd = subscription?.cancelAtPeriodEnd ?? false

  return {
    user,
    subscription,
    portalUrl,

    isPro,
    plan: user.plan,

    nextBillingDate,
    cancelAtPeriodEnd,
  }
})
