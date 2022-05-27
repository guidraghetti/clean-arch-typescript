import { Router } from 'express'
import { routerAdapter } from '../adapters'
import { makeLoginController, makeSignupController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/signup', routerAdapter(makeSignupController()))
  router.post('/login', routerAdapter(makeLoginController()))
}
