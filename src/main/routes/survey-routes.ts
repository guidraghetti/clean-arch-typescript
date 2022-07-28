import { Router } from 'express'
import { routerAdapter } from '../adapters'
import {
  makeAddSurveyControllerFactory,
  makeLoadSurveysController,
  makeSaveSurveyResultController,
  makeLoadSurveyResultController
} from '@/main/factories/controllers'
import { adminAuth, auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, routerAdapter(makeAddSurveyControllerFactory()))
  router.get('/surveys', auth, routerAdapter(makeLoadSurveysController()))
  router.put('/surveys/:surveyId/results', auth, routerAdapter(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, routerAdapter(makeLoadSurveyResultController()))
}
