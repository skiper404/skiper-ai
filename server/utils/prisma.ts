import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@@/prisma/generated/client"

const config = useRuntimeConfig()

const prismaClientSingleton = () => {
  const pool = new PrismaPg({ connectionString: config.databaseUrl })
  return new PrismaClient({ adapter: pool })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
