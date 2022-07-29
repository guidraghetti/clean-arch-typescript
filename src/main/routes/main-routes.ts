import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeMainControllerFactory } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/', adaptRoute(makeMainControllerFactory()))
}
