
import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controller/login'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount, makeDbAuthentication } from '../../../usecases'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => makeLogControllerDecorator(
  new SignUpController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication()
  )
)
