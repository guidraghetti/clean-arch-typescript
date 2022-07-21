import { loginPath, surveysPath, signupPath, surveyResultPath } from './paths'
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  answerSchema,
  surveySchema,
  surveysSchema,
  apiKeySchema,
  signupParamsSchema,
  addSurveyParamsSchema,
  saveSurveyResultSchema,
  surveyResultSchema
} from './schemas'
import { badRequest, unauthorized, serverError, notFound, forbidden } from './components'

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Clean Arch API',
    description: 'API de clean arch'
  },
  tags: [
    {
      name: 'Signup'
    },
    {
      name: 'Login'
    },
    {
      name: 'Survey'
    }
  ],
  paths: {
    '/signup': signupPath,
    '/login': loginPath,
    '/survey': surveysPath,
    '/survey/{surveyId}/result': surveyResultPath
  },
  schemas: {
    accountSchema,
    loginParamsSchema,
    signupParamsSchema,
    errorSchema,
    answerSchema,
    surveySchema,
    surveysSchema,
    addSurveyParamsSchema,
    saveSurveyResultSchema,
    surveyResultSchema
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
