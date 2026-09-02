import { z } from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { OrganizationAlreadyExistsError } from "../../../use-cases/errors/organization-already-exists.js";
import { makeCreateOrganizationUseCase } from "../../../use-cases/factories/make-create-organization-use-case.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    responsible_name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    whatsapp: z.string(),
  });

  const {
    name,
    responsible_name,
    email,
    password,
    cep,
    address,
    city,
    whatsapp,
  } = createBodySchema.parse(request.body);

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase();

    await createOrganizationUseCase.execute({
      name,
      responsible_name,
      email,
      password,
      cep,
      address,
      city,
      whatsapp,
    });
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
