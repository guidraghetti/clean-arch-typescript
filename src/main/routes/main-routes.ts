import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeMainControllerFactory } from '@/main/factories/controllers'

export const mainRoutes = (router: Router): void => {
  router.get('/', adaptRoute(makeMainControllerFactory()))
}
