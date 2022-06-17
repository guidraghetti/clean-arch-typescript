import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db'
import { BCRYPT_SALT, JWT_SECRET } from '../../../../config/constants'

export const makeDbAuthentication = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(BCRYPT_SALT)
  const jwtAdapter = new JwtAdapter(JWT_SECRET)

  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
