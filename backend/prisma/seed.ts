import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Hamza",
      email: "hamza@example.com",
      password: "password123",
      rank: "Gold Publisher",
      earnings: 1200.0,
      articles: 3,
    },
  });

  console.log(`Seeding complete. User: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
