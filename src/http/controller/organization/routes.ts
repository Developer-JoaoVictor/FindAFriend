import { create } from "./create.js";
import type { FastifyInstance } from "fastify";

export async function OrganizationRoutes(app: FastifyInstance) {
  app.post("/orgs", create);
}
