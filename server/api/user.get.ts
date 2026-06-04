export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  if (!session) {
    throw createError({ statusCode: 404, statusMessage: "User session not found" })
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  return user
})
