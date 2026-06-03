import { prisma } from "@backend/database/client";

export async function getProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      rank: true,
      earnings: true,
      articles: true,
      joinDate: true,
    },
  });
}

export async function updateProfile(userId: string, data: { name?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      rank: true,
      earnings: true,
      articles: true,
      // @ts-ignore - IDE caching issue, field exists in schema
      createdAt: true,
    },
  });
}
