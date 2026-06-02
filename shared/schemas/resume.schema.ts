import { filesize } from "filesize"
import z from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["application/pdf"]

export const schema = z.object({
  resume: z
    .instanceof(File, {
      message: "Please select an file.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${filesize(MAX_FILE_SIZE)}.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid file (PDF).",
    }),
})

export type ResumeSchema = z.output<typeof schema>
