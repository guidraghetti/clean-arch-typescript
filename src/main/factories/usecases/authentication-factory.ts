import { AccountMongoRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { BCRYPT_SALT, JWT_SECRET } from '@/main/config/constants'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter(BCRYPT_SALT)
  const jwtAdapter = new JwtAdapter(JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
