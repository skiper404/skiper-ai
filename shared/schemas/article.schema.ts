import z from "zod"

export const articleSchema = z.object({
  articleTitle: z.string().min(1, "Article Title is required"),
  articleLength: z.number().min(1, "Article Lenegth is required"),
})

export type ArticleSchema = z.output<typeof articleSchema>
