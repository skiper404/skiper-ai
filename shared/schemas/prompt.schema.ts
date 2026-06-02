import z from "zod"

export const promptSchema = z.object({
  userPrompt: z.string().min(1, "Prompt is required"),
})

export type PromptSchema = z.output<typeof promptSchema>
