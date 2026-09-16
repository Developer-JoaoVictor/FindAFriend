import z from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials-error.js";
import { MakeAuthenticateOrganizationUseCase } from "../../../use-cases/factories/make-authenticate-use-case.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email().min(6),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateOrganizationUseCase =
      MakeAuthenticateOrganizationUseCase();

    const { organization } = await authenticateOrganizationUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sub: organization.id,
        expiresIn: "7d",
      },
    );

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
