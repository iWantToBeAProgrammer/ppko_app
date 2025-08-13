import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const villages = [
  { name: "village 1" },
  { name: "village 2" },
  { name: "village 3" },
  { name: "village 4" },
  { name: "village 5" },
  { name: "village 6" },
  { name: "village 7" },
  { name: "village 8" },
];

const main = async () => {
  await prisma.village.createMany({
    data: villages,
  });
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
