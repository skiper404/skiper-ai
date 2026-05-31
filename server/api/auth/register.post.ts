import { registerUserSchema } from "@@/shared/schemas/register-user.schema"
import { hash } from "argon2"
import { prisma } from "../../utils/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, email, password } = registerUserSchema.parse(body)

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    throw createError({ statusCode: 409, statusMessage: "User already exist." })
  }

  const newUser = await prisma.user.create({ data: { username, email, password: await hash(password) } })

  await setUserSession(event, {
    user: { id: newUser.id, username: newUser.username, email: newUser.email },
  })

  return true
})
