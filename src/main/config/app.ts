import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'
import setupStaticFiles from '@/main/config/static-files'
import setupSwagger from '@/main/config/swagger'
import { setupApolloServer } from '@/main/graphql/apollo'

import express, { Express } from 'express'

const runApolloServer = async (app: Express): Promise<void> => {
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
}

const app: Express = express()

setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
runApolloServer(app).then(() => console.log('Apollo is running')).catch(console.error)

export { app }
