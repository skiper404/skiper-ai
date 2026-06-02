// import { incrementApiLimit } from '~~/server/services/user-api-limit'
import { groq } from "~~/server/utils/groq"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message are required",
    })
  }

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a senior software engineering assistant.

Your primary purpose is code generation and helping with software development.

Behavior rules:

1. If the user asks a programming or technical question:
   - Provide clean, production-ready code.
   - Prefer modern fullstack flow practices when relevant.
   - Be concise but useful.

2. If the user greets you (e.g. "hi", "hello", "привет"):
   - Respond briefly in the same language as the user.
   - Immediately transition to explaining that you are a coding assistant.
   - Guide them to ask a programming-related question.

Example behavior:
User: "привет"
Assistant: "Привет! Я помогаю с написанием кода и разработкой приложений. Чем помочь?"

3. If the user asks non-programming questions:
   - Politely refuse.
   - Redirect to programming topics.

4. Never engage in general conversation beyond a short greeting or transition sentence.

Always prioritize code and software engineering assistance.
`,
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
