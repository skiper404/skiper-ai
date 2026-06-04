export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found",
    })
  }

  return user
}
