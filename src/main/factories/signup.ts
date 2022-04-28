import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { Controller } from '../../presentetion/controller/protocols'
import { SignUpController } from '../../presentetion/controller/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const emailValidator = new EmailValidatorAdapter()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signUpController = new SignUpController(emailValidator, dbAddAccount)

  return new LogControllerDecorator(signUpController, new LogMongoRepository())
}
