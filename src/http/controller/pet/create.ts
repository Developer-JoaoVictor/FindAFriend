import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreatePetUseCase } from "../../../use-cases/factories/make-create-pet-use-case.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    type: z.enum(["DOG", "CAT"]),
    age: z.number().int(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    energy_level: z.number().int(),
    is_available: z.boolean(),
    independence_level: z.number().int(),
    environment: z.string(),
    requirements: z.array(z.string()),
  });

  const body = createPetBodySchema.parse(request.body);
  const organizationId = request.user.sub;

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    ...body,
    organization_id: organizationId,
  });

  return reply.status(201).send();
}
