import { Router } from 'express'
import { adaptMiddleware, routerAdapter } from '../adapters'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))

  router.post('/surveys', adminAuth, routerAdapter(makeAddSurveyControllerFactory()))
}
