import { Router } from 'express'
import { makeSignupController } from '../factories/signup'
import { routerAdapter } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(makeSignupController()))
}
