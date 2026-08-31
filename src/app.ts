import fastify from "fastify";
import { appRoutes } from "./routes.js";
import { OrganizationRoutes } from "./http/controller/organization/routes.js";

export const app = fastify();

app.register(appRoutes);

app.register(OrganizationRoutes);
