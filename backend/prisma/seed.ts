import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@contentflow.ai",
      password: "admin123",
      role: "admin",
      rank: "Administrator",
      earnings: 0,
      articles: 0,
    },
  });

  const publisher = await prisma.user.create({
    data: {
      name: "Hamza",
      email: "publisher@contentflow.ai",
      password: "publisher123",
      role: "publisher",
      rank: "Gold Publisher",
      earnings: 1200.0,
      articles: 3,
    },
  });

  console.log(`Seeding complete.`);
  console.log(`  Admin:     ${admin.email}`);
  console.log(`  Publisher:  ${publisher.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
