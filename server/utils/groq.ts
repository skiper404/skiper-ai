import Groq from "groq-sdk"

export const groq = new Groq({ apiKey: process.env.NUXT_GROQ_API_KEY })
