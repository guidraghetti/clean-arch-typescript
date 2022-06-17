
import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'
export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/', router)

  readdirSync(join(__dirname, '../routes')).forEach(async routeFile => {
    if (!routeFile.includes('.test.') && !routeFile.includes('.map')) (await import(`../routes/${routeFile}`)).default(router)
  })
}
