import type { User } from "~~/prisma/generated/client"

export const incrementLimit = async (user: User) => {
  if (user.generations >= 10) {
    throw createError({ statusCode: 403, statusMessage: "Free limit exceeded" })
  }
  await prisma.user.update({ where: { id: user.id }, data: { generations: { increment: 1 } } })
}
