import { verifyJWT } from "../../middleware/verify-jwt.js";
import { create } from "./create.js";
import type { FastifyInstance } from "fastify";

export async function PetRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, create);
}
