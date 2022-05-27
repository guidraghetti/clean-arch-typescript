import { Router } from 'express'
import { routerAdapter } from '../adapters'
import { makeAddSurveyControllerFactory } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', routerAdapter(makeAddSurveyControllerFactory()))
}
