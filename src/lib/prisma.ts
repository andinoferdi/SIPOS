type PrismaClientLike = Record<string, never>;

declare global {
  var prisma: PrismaClientLike | undefined;
}

const prismaClient = globalThis.prisma ?? {};

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaClient;
}

export const prisma = prismaClient;
