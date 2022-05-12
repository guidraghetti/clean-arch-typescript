
import { Controller } from '../../../../presentetion/controller/protocols'
import { SignUpController } from '../../../../presentetion/controller/signup/signup-controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-accont-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => makeLogControllerDecorator(
  new SignUpController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  )
)
