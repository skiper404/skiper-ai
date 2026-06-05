export const requireGenerationLimit = async (userId: string) => {
  const user = await getUser(userId)
  const isPro = await isUserPro(user.id)

  if (isPro) return user

  if (user.generations >= 10) {
    throw createError({
      statusCode: 403,
      statusMessage: "Free limit exceeded",
    })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { generations: { increment: 1 } },
  })

  return user
}
