import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'
import setupStaticFiles from '@/main/config/static-files'
import setupSwagger from '@/main/config/swagger'
import { setupApolloServer } from '@/main/graphql/apollo'

import express, { Express } from 'express'
import { MongoHelper } from '@/infra/db'
import { MONGO_URL, MONGO_DB } from './constants'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  MongoHelper.connect(`${MONGO_URL}/${MONGO_DB}`).then(() => console.log('Mongo connected')).catch(console.error)
  return app
}
