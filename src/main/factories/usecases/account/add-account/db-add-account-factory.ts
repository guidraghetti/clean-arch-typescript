import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db'
import { BCRYPT_SALT } from '@/main/config/constants'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(BCRYPT_SALT)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
