/* eslint-disable unicorn/prefer-top-level-await */

/* eslint-disable unicorn/no-process-exit */
import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";

type AccountCreateDataInput = Prisma.AccountCreateInput;

const prisma = new PrismaClient();

const createAdminAccount = (
  name: string,
  email: string,
  role: string,
): AccountCreateDataInput => ({
  user: {
    create: {
      name,
      email,
      role,
    },
  },
  type: "oauth",
  provider: "google",
  providerAccountId: "100766596949991433676",
});

async function main() {
  const accounts = await prisma.account.findMany();

  if (accounts.length > 0) {
    console.log("Accounts already exist.");
    return;
  }

  const hans = await prisma.account.create({
    data: createAdminAccount(
      "Hans Gabriel Daduya",
      "gabrieldaduya@gmail.com",
      "admin",
    ),
  });

  console.log({ hans });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
