export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const provider = "google"
    const providerAccountId = String(user.sub)

    //ищу аккаунт
    // если есть создаю сессию в которой указываю юзера который принадлежит этой сессии - редирект
    // ишу существующего юзера но могу его найти только если есть почта
    // если нахожу юзера создаю аккаунт к которму привязываю юзера(по userId) и создаю сессию - редирект
    // если не нахожу юзера тогда создаю его и привязываю аккаунт
    // создаю сессию - редирект

    const account = await prisma.account.findUnique({
      where: { provider_providerAccountId: { provider, providerAccountId } },
      include: { user: true },
    })

    if (account) {
      await setUserSession(event, {
        user: {
          id: account.user.id,
          username: account.user.username,
          email: account.user.email,
        },
      })
      return sendRedirect(event, "/")
    }

    const existingUser = user.email
      ? await prisma.user.findUnique({
          where: { email: user.email },
        })
      : null

    if (existingUser) {
      await prisma.account.create({
        data: { provider, providerAccountId, userId: existingUser.id },
      })

      await setUserSession(event, {
        user: {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
        },
      })
      return sendRedirect(event, "/")
    }

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        username: user.name,
        accounts: { create: { provider, providerAccountId } },
      },
    })

    await setUserSession(event, {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    })
    return sendRedirect(event, "/")
  },
})
