import type { FastifyInstance } from "fastify";

export function appRoutes(app: FastifyInstance){
    app.get("/", (request, reply) => {
     return reply.send("Hello world")
    })
}