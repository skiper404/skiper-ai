import { getHeader, readRawBody, createError } from "h3"
import { createHmac } from "node:crypto"

export default defineEventHandler(async (event) => {
  console.log("=== POLAR WEBHOOK START ===")
  const config = useRuntimeConfig()

  const signature = getHeader(event, "polar-signature")
  const rawBody = await readRawBody(event, false)

  console.log("Signature exists:", !!signature)
  console.log("Body exists:", !!rawBody)

  if (!rawBody || !signature) {
    throw createError({ statusCode: 400 })
  }

  // 🔐 verify
  const hmac = createHmac("sha256", config.polarWebhookSecret)
  hmac.update(rawBody)

  const expected = hmac.digest("hex")

  if (expected !== signature) {
    throw createError({ statusCode: 401, statusMessage: "Invalid signature" })
  }

  console.log("Signature verified")

  const payload = JSON.parse(rawBody.toString())

  console.log("Payload type:", payload.type)
  console.log("Payload:", JSON.stringify(payload, null, 2))

  // 💳 event handling
  if (payload.type === "subscription:active") {
    const userId = payload.data?.metadata.userId

    if (!userId) return

    console.log("User ID:", userId)

    await prisma.user.update({ where: { id: userId }, data: { plan: "PRO" } })

    console.log("Updated user")
  }

  return { ok: true }
})
