import { adaptMiddleware } from '../adapters'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
export const auth = adaptMiddleware(makeAuthMiddleware())
