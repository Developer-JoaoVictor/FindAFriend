import fastify from 'fastify'
import { appRoutes } from './routes.js'

export const app = fastify()

app.register(appRoutes)