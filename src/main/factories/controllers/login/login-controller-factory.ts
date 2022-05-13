import { LoginController } from '../../../../presentation/controller/login/login-controller'
import { Controller } from '../../../../presentation/controller/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '../../usecases'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => makeLogControllerDecorator(
  new LoginController(
    makeDbAuthentication(),
    makeLoginValidation()
  )
)
