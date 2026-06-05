import Groq from "groq-sdk"

const config = useRuntimeConfig()

export const groq = new Groq({ apiKey: config.groqApiKey })
