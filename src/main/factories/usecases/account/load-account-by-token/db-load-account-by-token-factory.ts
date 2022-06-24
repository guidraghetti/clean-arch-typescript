import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db'
import { JWT_SECRET } from '../../../../config/constants'

export const makeDbLoadAccountByTokenFactory = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(JWT_SECRET)

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
