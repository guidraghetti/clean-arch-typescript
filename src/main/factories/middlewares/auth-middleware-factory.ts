import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByTokenFactory } from '../usecases'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByTokenFactory(), role)
}
