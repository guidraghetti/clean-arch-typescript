import { Router } from 'express'
import { routerAdapter } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/login/login-factory'
import { makeSignupController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(makeSignupController()))
  router.post('/login', routerAdapter(makeLoginController()))
}
