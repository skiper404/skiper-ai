import { loginUserSchema } from "@@/shared/schemas/login-user.schema"
import { verify } from "argon2"
import { prisma } from "../../utils/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = loginUserSchema.parse(body)

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (!existingUser || !existingUser.password) {
    throw createError({ statusCode: 401, message: "Unathorized" })
  }

  const isPasswordValid = await verify(existingUser.password, password)

  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: "Unauthorized" })
  }

  await setUserSession(event, {
    user: { id: existingUser.id, username: existingUser.username, email: existingUser.email },
  })

  return true
})
