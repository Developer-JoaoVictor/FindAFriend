import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const url = new URL(connectionString);

const schema = url.searchParams.get("schema") ?? "public";

const adapter = new PrismaPg(
  {
    connectionString,
  },
  {
    schema,
  },
);

export const prisma = new PrismaClient({ adapter });
