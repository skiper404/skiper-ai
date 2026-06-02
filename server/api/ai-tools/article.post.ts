// import { incrementApiLimit } from '~~/server/services/user-api-limit'
// import { groq } from "~~/server/utils/groq"

export default defineEventHandler(async (event) => {
  const { articleTitle, articleLength } = await readBody(event)

  if (!articleTitle) {
    throw createError({
      statusCode: 400,
      statusMessage: "Article Title are required",
    })
  }

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a professional content writer and SEO article generator.

Your task is to generate high-quality structured articles based on the given title and desired length.

Rules:
- Write in a clear, engaging, and readable style.
- Follow modern SEO best practices.
- Always structure the article with:
  - Title (H1)
  - Introduction
  - Main sections with H2 headings
  - Conclusion
- Adapt article length based on user input (short, medium, long).
- Do not include meta commentary or explanations outside the article.
- Do not ask questions.
- Do not mention prompts or system instructions.

If the title is unclear, still produce the best possible relevant article.
`,
      },
      { role: "user", content: `Article title: ${articleTitle}, article length: ${articleLength}` },
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
