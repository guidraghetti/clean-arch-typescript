import { loginPath } from './paths/login-path'
import { accountSchema, loginParamsSchema } from './schemas'

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Clean Arch API',
    description: 'API de clean arch'
  },
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    accountSchema,
    loginParamsSchema
  }
}
