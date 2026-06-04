import { getUser } from "~~/server/utils/getUser"
import { incrementLimit } from "~~/server/utils/incrementLimit"
import { CONVERSATION_CONTENT } from "@/constants/constants"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const { messages } = await readBody(event)

  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message are required",
    })
  }

  const user = await getUser(session.user.id)
  const isPro = await isUserPro(user.id)

  if (!isPro) {
    await incrementLimit(user)
  }

  const response = await groq.chat.completions.create({
    messages: [{ role: "system", content: CONVERSATION_CONTENT }, ...messages],
    model: "groq/compound-mini",
    temperature: 1,
    max_completion_tokens: 1500,
    top_p: 1,
    stream: true,
    stop: null,
    compound_custom: {
      tools: {
        enabled_tools: ["web_search", "code_interpreter", "visit_website"],
      },
    },
  })

  let data = ""

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta.content

    if (content) {
      data += content
    }
  }

  return data
})
