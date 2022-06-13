import { Router } from 'express'
import { adaptMiddleware, routerAdapter } from '../adapters'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-survey/load-surveys-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())

  router.post('/surveys', adminAuth, routerAdapter(makeAddSurveyControllerFactory()))
  router.get('/surveys', auth, routerAdapter(makeLoadSurveysController()))
}
