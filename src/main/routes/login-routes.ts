import { Router } from 'express'
import { routerAdapter } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(makeSignupController()))
  router.post('/login', routerAdapter(makeLoginController()))
}
