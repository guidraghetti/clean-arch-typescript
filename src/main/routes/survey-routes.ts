import { Router } from 'express'
import { routerAdapter } from '../adapters'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-survey/load-surveys-controller-factory'
import { adminAuth, auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, routerAdapter(makeAddSurveyControllerFactory()))
  router.get('/surveys', auth, routerAdapter(makeLoadSurveysController()))
}
