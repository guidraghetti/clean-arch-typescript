import { Router } from 'express'
import { routerAdapter } from '../adapters'
import { makeAddSurveyControllerFactory, makeLoadSurveysController } from '../factories/controllers'
import { adminAuth, auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, routerAdapter(makeAddSurveyControllerFactory()))
  router.get('/surveys', auth, routerAdapter(makeLoadSurveysController()))
}
