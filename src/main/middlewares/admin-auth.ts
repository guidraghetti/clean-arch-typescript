import { adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories'

export const adminAuth: any = adaptMiddleware(makeAuthMiddleware('admin'))
