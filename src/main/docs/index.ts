import { loginPath, surveysPath } from './paths'
import { accountSchema, loginParamsSchema, errorSchema, answerSchema, surveySchema, surveysSchema, apiKeySchema } from './schemas'
import { badRequest, unauthorized, serverError, notFound, forbidden } from './components'

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Clean Arch API',
    description: 'API de clean arch'
  },
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Survey'
    }
  ],
  paths: {
    '/login': loginPath,
    '/survey': surveysPath
  },
  schemas: {
    accountSchema,
    loginParamsSchema,
    errorSchema,
    answerSchema,
    surveySchema,
    surveysSchema
  },
  components: {
    securitySchemes: {
      apiKeySchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
