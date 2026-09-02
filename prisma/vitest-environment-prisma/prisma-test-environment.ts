import "dotenv/config";

import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

import type { Environment } from "vitest/runtime";

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default {
  name: "prisma",
  viteEnvironment: "ssr",

  async setup() {
    const schema = randomUUID();

    const databaseUrl = generateDatabaseUrl(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync("pnpm exec prisma migrate deploy");

    const { prisma } = await import("../../src/lib/prisma.js");

    return {
      async teardown() {
        try {
          await prisma.$executeRawUnsafe(
            `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
          );
        } finally {
          await prisma.$disconnect();
        }
      },
    };
  },
} satisfies Environment;
