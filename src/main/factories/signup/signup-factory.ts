
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentetion/controller/protocols'
import { SignUpController } from '../../../presentetion/controller/signup/signup-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signUpController = new SignUpController(dbAddAccount, makeSignupValidation())

  return new LogControllerDecorator(signUpController, new LogMongoRepository())
}