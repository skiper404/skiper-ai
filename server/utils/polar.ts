import { Polar } from "@polar-sh/sdk"

const config = useRuntimeConfig()

export const polar = new Polar({
  accessToken: config.polarAccessToken,
  server: config.polarServer as "sandbox" | "production",
})

export const getPolarCustomer = async (externalId: string) => {
  return await polar.customers.getExternal({
    externalId,
  })
}

export const createPolarCustomer = async (user: { id: string; email: string }) => {
  return await polar.customers.create({
    email: user.email,
    externalId: user.id,
  })
}

export const getOrCreatePolarCustomer = async (user: { id: string; email: string }) => {
  try {
    return await getPolarCustomer(user.id)
  } catch {
    return await createPolarCustomer(user)
  }
}

export const getUserSubscription = async (userId: string) => {
  try {
    const state = await polar.customers.getStateExternal({
      externalId: userId,
    })

    return state.activeSubscriptions?.[0] ?? null
  } catch (error) {
    console.error("Polar getCustomerState error:", error)
    return null
  }
}

export const getCustomerPortalUrl = async (user: { id: string; email: string }) => {
  try {
    const customer = await getOrCreatePolarCustomer(user)

    const session = await polar.customerSessions.create({
      customerId: customer.id,
    })

    return session.customerPortalUrl
  } catch (error) {
    console.error("Polar portal error:", error)
    return null
  }
}
