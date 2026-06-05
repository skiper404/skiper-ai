export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const query = getQuery(event)
  const config = useRuntimeConfig()

  const checkout = await polar.checkouts.create({
    products: [config.polar.productId as string],
    successUrl: `${config.polar.successUrl}/success` as string,
    returnUrl: `${config.public.appUrl}/dashboard` as string,
    customerEmail: query.customerEmail as string,
    metadata: { userId: session.user.id as string },
  })

  return { url: checkout.url }
})
