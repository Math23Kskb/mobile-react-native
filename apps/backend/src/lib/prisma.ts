import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient({log: ['error','warn']});
const globalForPrisma = globalThis as unknown as {prisma?: PrismaClient};
export const prisma = globalForPrisma.prisma ?? prismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;