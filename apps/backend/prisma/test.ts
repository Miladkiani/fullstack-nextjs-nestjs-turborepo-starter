import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  const userCount = await prisma.user.count();
  console.log(`✅ Total users: ${userCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(() => prisma.$disconnect());
