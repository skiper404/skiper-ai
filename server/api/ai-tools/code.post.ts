import { CODE_CONTENT } from "~/constants/constants"
import { requireGenerationLimit } from "~~/server/utils/requireGenerationLimit"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)

  const { messages } = await readBody(event)

  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message are required",
    })
  }

  await requireGenerationLimit(session.user.id)

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: CODE_CONTENT,
      },
      ...messages,
    ],
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
