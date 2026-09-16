import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { appRoutes } from "./routes.js";
import { OrganizationRoutes } from "./http/controller/organization/routes.js";
import { env } from "./env/index.js";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.register(OrganizationRoutes);
