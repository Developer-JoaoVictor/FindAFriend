import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { appRoutes } from "./routes.js";
import { OrganizationRoutes } from "./http/controller/organization/routes.js";
import { env } from "./env/index.js";
import { ZodError } from "zod";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.register(OrganizationRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
    });
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
