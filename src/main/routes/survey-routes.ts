import { Router } from 'express'
import { routerAdapter } from '../adapters'
import { makeAddSurveyControllerFactory, makeLoadSurveysController } from '../factories/controllers'
import { makeSaveSurveyResultController } from '../factories/controllers/survey/save-survey-result/save-survey-result-controller-factory'
import { adminAuth, auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, routerAdapter(makeAddSurveyControllerFactory()))
  router.get('/surveys', auth, routerAdapter(makeLoadSurveysController()))
  router.put('/surveys/:surveyId/results', auth, routerAdapter(makeSaveSurveyResultController()))
}
