import { Express, Router } from 'express'
import { loginRoutes, mainRoutes, surveyResultRoutes, surveyRoutes } from '@/main/routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  loginRoutes(router)
  mainRoutes(router)
  surveyResultRoutes(router)
  surveyRoutes(router)
}
