import { LoginController } from '../../../../presentetion/controller/login/login-controller'
import { Controller } from '../../../../presentetion/controller/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => makeLogControllerDecorator(
  new LoginController(
    makeDbAuthentication(),
    makeLoginValidation()
  )
)
