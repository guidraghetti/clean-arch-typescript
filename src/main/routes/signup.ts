import { Router } from 'express'
import { routerAdapter } from '../adapters/express-route-adapter'
import { makeSignupController } from '../factories/signup/signup'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(makeSignupController()))
}
