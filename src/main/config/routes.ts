
import { Express, Router } from 'express'
import fastGlob from 'fast-glob'
export const setupRoutes = (app: Express): void => {
  const router = Router()
  fastGlob.sync('src/main/routes/**/*.ts').forEach(async routeFile =>
    (await import(`../../../${routeFile}`)).default(router)
  )
}
