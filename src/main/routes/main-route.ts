import { Router } from 'express'
import { routerAdapter } from '../adapters'
import { makeMainControllerFactory } from '../factories/controllers'

export default (router: Router): void => {
  router.get('/', routerAdapter(makeMainControllerFactory()))
}
